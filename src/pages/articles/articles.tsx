import { articleAPI } from '@entities/article/model/article-api';
import { Button } from '@shared/ui/button/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './articles.module.scss';
import { Article } from '@entities/article/model/types';

const articlesOptions = {
  queryKey: ['fetch-articles'],
  queryFn: articleAPI.getArticles,
  gcTime: 30000,
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
      {error && <p>{error.message}</p>}
      {isSuccess && (
        <ul>
          {articles?.map((article) => (
            <li
              key={article.id}
              style={{ border: '1px solid #ccc', padding: '12px' }}
            >
              <Button
                type="button"
                onClick={() => handleDeleteArticle(article.id)}
              >
                Удалить
              </Button>
              <p>Id: {article.id}</p>
              <p>Заголовок: {article.title}</p>
              <p>Тип: {article.content.type}</p>
              <div>
                {article.content.type === 'draft' ? (
                  <div>
                    <p>Черновик</p>
                  </div>
                ) : (
                  <div>
                    <p>
                      Опубликована: {article.content.isNew && 'Новая статья'}
                    </p>
                    <p>{article.content.description}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
