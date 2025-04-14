import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articleAPI } from '../model/article-api';
import { Article } from '../model/types';

type useDeleteArticlesProps = {
  articlesQueryOptions: {
    queryKey: string[];
    queryFn: () => Promise<Article[]>;
    staleTime: number;
  };
};

export const useDeleteArticle = ({
  articlesQueryOptions,
}: useDeleteArticlesProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteArticle } = useMutation({
    mutationFn: articleAPI.deleteArticle,
    onMutate: async (articleId: string) => {
      await queryClient.cancelQueries(articlesQueryOptions);

      const previousArticles = queryClient.getQueryData<Article>(
        articlesQueryOptions.queryKey
      );

      if (Array.isArray(previousArticles)) {
        queryClient.setQueryData(
          articlesQueryOptions.queryKey,
          previousArticles.filter((article) => article.id !== articleId)
        );
      }

      return { previousArticles };
    },
    onError: (_err, _variables, context) => {
      if (context) {
        queryClient.setQueryData<Article>(
          articlesQueryOptions.queryKey,
          context.previousArticles
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: articlesQueryOptions.queryKey,
      });
    },
  });

  const handleDeleteArticle = (articleId: string) => {
    deleteArticle(articleId);
  };

  return { handleDeleteArticle };
};
