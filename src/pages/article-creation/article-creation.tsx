import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/ui/button/button';
import { Input } from '@shared/ui/input/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './article-creation.module.scss';
import { useNavigate } from 'react-router';
import { routes } from '@shared/services/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articleAPI } from '@entities/article/model/article-api';
import { Error } from '@shared/ui/error/error';
import { CreateArticle } from '@entities/article/model/types';
import { Select } from '@shared/ui/select/select';

const schema = z.object({
  title: z
    .string()
    .min(1, 'Минимальная длина названия - 1 символ')
    .max(100, 'Максимальная длина названия - 100 символов'),
  content: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('draft'),
    }),
    z.object({
      type: z.literal('published'),
      description: z
        .string()
        .min(10, 'Минимальная длина описания - 10 символов')
        .max(1000, 'Максимальная длина описания - 1000 символов'),
      isNew: z.boolean().default(false).optional(),
    }),
  ]),
});

type CreateArticleForm = z.infer<typeof schema>;

// const Title = z
//   .string()
//   .min(1, 'Минимальная длина названия - 1 символ')
//   .max(100, 'Максимальная длина названия - 100 символов');

// const Published = z.object({
//   description: z
//     .string()
//     .min(10, 'Минимальная длина описания - 10 символов')
//     .max(1000, 'Максимальная длина описания - 1000 символов'),
//   isNew: z.boolean().default(false).optional(),
//   type: z.literal('published'),
// });

// const Draft = z.object({
//   type: z.literal('draft'),
// });

// const Schema = z.object({
//   content: z.discriminatedUnion('type', [Published, Draft]),
//   title: Title,
// });

// type Schema = z.infer<typeof Schema>;

const articleTypeOptions = [
  { text: 'Draft', value: 'draft' },
  { text: 'Published', value: 'published' },
];

// const isSchema = (schema: unknown): schema is Schema => {
//   if (typeof schema === 'object' && schema !== null && 'type' in schema) {
//     return schema.type === 'published' || schema.type === 'draft';
//   }
//   return false;
// };

export const ArticleCreation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateArticleForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: { type: 'draft' },
    },
  });

  const contentType = watch('content.type');

  const { mutate, status } = useMutation({
    mutationFn: articleAPI.createArticle,
    onSuccess: () => {
      reset();
      navigate(routes.articles.pathname);
      queryClient.invalidateQueries({ queryKey: ['fetch-articles'] });
    },
  });

  const handleCreateArticle = handleSubmit((data: CreateArticleForm) => {
    const articleData: CreateArticle =
      data.content.type === 'draft'
        ? {
            ...data,
            content: { type: 'draft' },
          }
        : {
            ...data,
            content: {
              type: 'published',
              description: data.content.description,
              isNew: true,
            },
          };

    mutate(articleData);
  });

  return (
    <div className="container">
      <h1 className={styles['create-article-title']}>Создать статью</h1>
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
          <div className={styles['input-wrapper']}>
            <Input
              textarea
              placeholder="Описание"
              rows={5}
              {...register('content.description')}
              className={styles['article-description-textarea']}
              disabled={isSubmitting}
            />
            {errors.content && 'description' in errors.content && (
              <Error
                isVisible={true}
                message={errors.content.description.message}
              />
            )}
          </div>
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
    </div>
  );
};
