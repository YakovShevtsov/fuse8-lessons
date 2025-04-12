import { Button } from '@shared/ui/button/button';
import { Article } from '../model/types';

type ArticleCardProps = {
  articleData: Article;
  onDelete: (articleId: string) => void;
};

export const ArticleCard = ({ articleData, onDelete }: ArticleCardProps) => {
  return (
    <li style={{ border: '1px solid #ccc', padding: '12px' }}>
      <Button type="button" onClick={() => onDelete(articleData.id)}>
        Удалить
      </Button>
      <p>Id: {articleData.id}</p>
      <p>Заголовок: {articleData.title}</p>
      <p>Тип: {articleData.content.type}</p>
      <div>
        {articleData.content.type === 'draft' ? (
          <div>
            <p>Черновик</p>
          </div>
        ) : (
          <div>
            <p>Опубликована: {articleData.content.isNew && 'Новая статья'}</p>
            <p>{articleData.content.description}</p>
          </div>
        )}
      </div>
    </li>
  );
};
