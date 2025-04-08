import { articleAPI } from '@entities/article/model/article-api';
import { Button } from '@shared/ui/button/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './articles.module.scss';

export const Articles = () => {
  const queryClient = useQueryClient();

  const { data: articles, status } = useQuery({
    queryKey: ['fetch-articles'],
    queryFn: articleAPI.getArticles,
  });

  const { mutate: deleteArticle } = useMutation({
    mutationFn: articleAPI.deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-articles'] });
    },
  });

  const handleDeleteArticle = (articleId: string) => {
    deleteArticle(articleId);
  };

  return (
    <div className="container">
      {status === 'pending' && (
        <p className={styles['articles-loader']}>Loading...</p>
      )}
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
                  <p>Опубликована: {article.content.isNew && 'Новая статья'}</p>
                  <p>{article.content.description}</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
