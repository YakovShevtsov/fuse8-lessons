import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/ui/button/button';
import { Input } from '@shared/ui/input/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './create-article.module.scss';
import { useNavigate } from 'react-router';
import { routes } from '@shared/services/routes';
import { useMutation } from '@tanstack/react-query';
import { articleAPI } from '@entities/article/model/article-api';
import { Error } from '@shared/ui/error/error';

const schema = z.object({
  title: z
    .string()
    .min(1, 'Минимальная длина названия - 1 символ')
    .max(100, 'Максимальная длина названия - 100 символов'),
  description: z
    .string()
    .max(600, 'Максимальная длина описания - 600 символов')
    .optional(),
});

type CreateArticleForm = z.infer<typeof schema>;

export const CreateArticle = () => {
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

  const handleCreateArticle = handleSubmit((data) => {
    mutate({
      ...data,
      content: {
        type: 'draft',
      },
    });
    navigate(routes.articles);
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
          {...register('description')}
          className={styles['article-description-textarea']}
        />
        <Button type="submit" disabled={status === 'pending'}>
          Создать
        </Button>
        <div className={styles['create-article-errors']}>
          {errors &&
            Object.entries(errors).map(([field, error]) => (
              <Error
                key={field}
                isVisible={errors.title ? true : false}
                message={error?.message}
              />
            ))}
        </div>
      </form>
    </div>
  );
};
