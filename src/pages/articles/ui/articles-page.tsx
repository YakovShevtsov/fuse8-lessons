import { articleAPI } from '@entities/article/model/article-api';
import { useQuery } from '@tanstack/react-query';
import styles from './articles-page.module.scss';
import { Article } from '@entities/article/model/types';
import { ArticleCard } from '@entities/article/ui/article-card';
import { Error } from '@shared/ui/error/error';
import { useDeleteArticle } from '@entities/article/hooks/use-delete-article';

const articlesQueryOptions = {
  queryKey: ['fetch-articles'],
  queryFn: articleAPI.getArticles,
  staleTime: 30000,
};

export const Articles = () => {
  const {
    data: articles,
    isPending,
    isSuccess,
    error,
  } = useQuery(articlesQueryOptions);

  const { handleDeleteArticle } = useDeleteArticle({ articlesQueryOptions });

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
