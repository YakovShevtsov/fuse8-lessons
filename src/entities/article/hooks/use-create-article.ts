import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateArticleForm } from '../../../pages/article-creation/ui/article-creation-form/form-schema';
import { Article } from '@entities/article/model/types';
import { articleAPI } from '@entities/article/model/article-api';
import { routes } from '@shared/services/routes';

type useCreateArticleProps = {
  handleSubmit: (onSubmit: (data: CreateArticleForm) => void) => () => void;
  navigate?: (route: string) => void;
  reset?: () => void;
};

export const useCreateArticle = ({
  handleSubmit,
  navigate,
  reset,
}: useCreateArticleProps) => {
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: articleAPI.createArticle,
    onSuccess: (data) => {
      queryClient.setQueryData<Article[]>(['fetch-articles'], (oldArticles) => {
        if (!oldArticles) return [data];
        return [data, ...oldArticles];
      });

      if (reset) reset();
      if (navigate) navigate(routes.articles.pathname);
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

  return { status, handleCreateArticle };
};
