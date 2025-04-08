import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/ui/button/button';
import { Input } from '@shared/ui/input/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './article-creation.module.scss';
import { useNavigate } from 'react-router';
import { routes } from '@shared/services/routes';
import { useMutation } from '@tanstack/react-query';
import { articleAPI } from '@entities/article/model/article-api';
import { Error } from '@shared/ui/error/error';
import { CreateArticle } from '@entities/article/model/types';

const schema = z.object({
  title: z
    .string()
    .min(1, 'Минимальная длина названия - 1 символ')
    .max(100, 'Максимальная длина названия - 100 символов'),
  content: z.union([
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

export const ArticleCreation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateArticleForm>({
    resolver: zodResolver(schema),
  });

  const { mutate, status } = useMutation({
    mutationFn: articleAPI.createArticle,
  });

  const navigate = useNavigate();

  const handleCreateArticle = handleSubmit((data: CreateArticleForm) => {
    const finalData: CreateArticle =
      data.content.type === 'draft'
        ? {
            title: data.title,
            content: { type: 'draft' },
          }
        : {
            title: data.title,
            content: {
              type: 'published',
              description: data.content.description,
              isNew: true,
            },
          };

    mutate(finalData);
    navigate(routes.articles.pathname);
  });

  return (
    <div className="container">
      <h1 className={styles['create-article-title']}>Создать статью</h1>
      <form
        className={styles['create-article-form']}
        onSubmit={handleCreateArticle}
      >
        <Input
          placeholder="Название статьи"
          type="text"
          {...register('title')}
        />
        <Input
          textarea
          placeholder="Описание"
          rows={5}
          {...register('content.description')}
          className={styles['article-description-textarea']}
        />
        <select
          {...register('content.type')}
          className={styles['article-type']}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <div className={styles['article-is-new']}>
          <Input
            type="checkbox"
            {...register('content.isNew')}
            id="article-is-new-checkbox"
          />
          <label htmlFor="article-is-new-checkbox">Новая статья</label>
        </div>
        <Button type="submit" disabled={status === 'pending'}>
          Создать
        </Button>
        {errors &&
          Object.entries(errors).map(([field, error]) => (
            <div className={styles['create-article-errors']}>
              <Error key={field} isVisible={true} message={error?.message} />
            </div>
          ))}
      </form>
    </div>
  );
};
