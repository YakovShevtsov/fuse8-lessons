import { useNavigate } from 'react-router';
import { routes } from '@shared/services/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articleAPI } from '@entities/article/model/article-api';
import { Error } from '@shared/ui/error/error';
import { Select } from '@shared/ui/select/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/ui/button/button';
import { Input } from '@shared/ui/input/input';
import { Controller, useForm } from 'react-hook-form';
import { CreateArticleForm, CreateArticleFormSchema } from './form-schema';
import styles from './article-creation-form.module.scss';
import { Article } from '@entities/article/model/types';

const articleTypeOptions = [
  { text: 'Draft', value: 'draft' },
  { text: 'Published', value: 'published' },
];

export const ArticleCreationForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateArticleForm>({
    resolver: zodResolver(CreateArticleFormSchema),
    defaultValues: {
      content: { type: 'draft' },
    },
  });

  const contentType = watch('content.type');

  const { mutate, status } = useMutation({
    mutationFn: articleAPI.createArticle,
    onSuccess: (data) => {
      queryClient.setQueryData<Article[]>(['fetch-articles'], (oldArticles) => {
        if (!oldArticles) return [data];
        return [data, ...oldArticles];
      });
      reset();
      navigate(routes.articles.pathname);

      queryClient.invalidateQueries({ queryKey: ['fetch-articles'] });
    },
  });

  const handleCreateArticle = handleSubmit((data: CreateArticleForm) => {
    mutate({
      title: data.title,
      content:
        data.content.type === 'draft'
          ? { type: 'draft' }
          : {
              type: 'published',
              description: data.content.description,
              isNew: data.content.isNew ?? false,
            },
    });
  });

  return (
    <>
      {status === 'error' && (
        <Error
          isVisible={true}
          message="Произошла ошибка при создании статьи"
        />
      )}
      <form
        className={styles['create-article-form']}
        onSubmit={handleCreateArticle}
      >
        <div className={styles['input-wrapper']}>
          <Input
            placeholder="Название статьи"
            type="text"
            {...register('title')}
            disabled={isSubmitting}
          />
          {errors.title && (
            <Error isVisible={true} message={errors.title.message} />
          )}
        </div>

        {contentType === 'published' && (
          <Controller
            control={control}
            name="content.description"
            render={({ fieldState, field }) => (
              <div className={styles['input-wrapper']}>
                <Input
                  textarea
                  placeholder="Описание"
                  rows={5}
                  {...field}
                  className={styles['article-description-textarea']}
                  disabled={isSubmitting}
                  aria-invalid={!!fieldState.error}
                />
                {fieldState.error && (
                  <Error isVisible={true} message={fieldState.error.message} />
                )}
              </div>
            )}
          />
        )}

        <Select options={articleTypeOptions} {...register('content.type')} />
        {contentType === 'published' && (
          <div className={styles['article-is-new']}>
            <Input
              type="checkbox"
              {...register('content.isNew')}
              id="article-is-new-checkbox"
              disabled={isSubmitting}
            />
            <label htmlFor="article-is-new-checkbox">Новая статья</label>
          </div>
        )}

        <Button type="submit" disabled={status === 'pending'}>
          {status === 'pending' ? 'Создание' : 'Создать'}
        </Button>
      </form>
    </>
  );
};
