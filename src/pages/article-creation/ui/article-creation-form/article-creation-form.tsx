import { useNavigate } from 'react-router';
import { Error } from '@shared/ui/error/error';
import { Select } from '@shared/ui/select/select';
// import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/ui/button/button';
import { Input } from '@shared/ui/input/input';
import { Controller, useForm } from 'react-hook-form';
import {
  CreateArticleFormSchemaYup,
  CreateArticleFormYup,
} from './form-schema';
import styles from './article-creation-form.module.scss';
// import { CreateArticle } from '@entities/article/model/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateArticle } from '@entities/article/hooks/use-create-article';

const articleTypeOptions = [
  { text: 'Draft', value: 'draft' },
  { text: 'Published', value: 'published' },
];

export const ArticleCreationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateArticleFormYup>({
    // resolver: zodResolver(CreateArticleFormSchema),
    resolver: yupResolver(CreateArticleFormSchemaYup),
    defaultValues: {
      content: { type: 'draft' },
    },
  });

  const contentType = watch('content.type');

  const { handleCreateArticle, status } = useCreateArticle({
    handleSubmit,
    navigate,
    reset,
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
          
          // NOT WORKING

          // <div className={styles['input-wrapper']}>
          //   <Input
          //     textarea
          //     placeholder="Описание"
          //     rows={5}
          //     {...register('content.description')}
          //     className={styles['article-description-textarea']}
          //     disabled={isSubmitting}
          //   />
          //   {errors.content && 'description' in errors.content &&  (
          //     <Error isVisible={true} message={errors.content.description} />
          //   )}
          // </div>
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
