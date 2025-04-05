import { Button } from '@shared/ui/button/button';
import { Input } from '@shared/ui/input/input';

export const CreateArticle = () => {
  return (
    <div className="container">
      <h1>Создать статью</h1>
      <form>
        <Input type="text" />
        <Button type="submit" style={{ marginTop: '8px' }}>
          Создать
        </Button>
      </form>
    </div>
  );
};
