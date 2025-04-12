import { articleAPI } from '@entities/article/model/article-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './articles-page.module.scss';
import { Article } from '@entities/article/model/types';
import { ArticleCard } from '@entities/article/ui/article-card';
import { Error } from '@shared/ui/error/error';

const articlesOptions = {
  queryKey: ['fetch-articles'],
  queryFn: articleAPI.getArticles,
  staleTime: 30000,
};

export const Articles = () => {
  const queryClient = useQueryClient();

  const {
    data: articles,
    isPending,
    isSuccess,
    error,
  } = useQuery(articlesOptions);

  const { mutate: deleteArticle } = useMutation({
    mutationFn: articleAPI.deleteArticle,
    onMutate: async (articleId: string) => {
      await queryClient.cancelQueries(articlesOptions);

      const previousArticles = queryClient.getQueryData<Article>(
        articlesOptions.queryKey
      );

      if (Array.isArray(previousArticles)) {
        queryClient.setQueryData(
          articlesOptions.queryKey,
          previousArticles.filter((article) => article.id !== articleId)
        );
      }

      return { previousArticles };
    },
    onError: (err, variables, context) => {
      if (context) {
        queryClient.setQueryData<Article>(
          ['fetch-articles'],
          context.previousArticles
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-articles'] });
    },
  });

  const handleDeleteArticle = (articleId: string) => {
    deleteArticle(articleId);
  };

  return (
    <div className="container">
      {isPending && <p className={styles['articles-loader']}>Loading...</p>}
      {error && <Error message={error.message} isVisible={true} />}
      {isSuccess && (
        <ul>
          {articles?.map((article: Article) => (
            <ArticleCard
              key={article.id}
              onDelete={handleDeleteArticle}
              articleData={article}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
