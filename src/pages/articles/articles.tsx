import { Button } from '@shared/ui/button/button';

export const Articles = () => {
  return (
    <ul>
      <li style={{ border: '1px solid #ccc', padding: '12px' }}>
        <Button type="button">Удалить</Button>
        <p>Id: </p>
        <p>Заголовок: </p>
        <p>Тип: </p>
        <div>
          <div>
            <p>Опубликована</p>
            <p>Описание</p>
          </div>
        </div>
      </li>
    </ul>
  );
};
