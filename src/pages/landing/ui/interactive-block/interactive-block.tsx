import Screen from '@shared/ui/screen/screen';
import styles from './interactive-block.module.scss';
import Input from '@shared/ui/input/input';
import Button from '@shared/ui/button/button';
import { useNavigate } from 'react-router';
import AlertIcon from '@shared/ui/icons/alert-icon';

const InteractiveBlock = () => {
  const navigate = useNavigate();

  return (
    <Screen>
      <h2>Интерактив?</h2>
      <div className={styles['interactive-actions']}>
        <Input type="text" placeholder="Напишите тут что-нибудь" />
        <Button onClick={() => navigate('#')}>
          Вывести текст в alert
          <AlertIcon fill="currentColor" />
        </Button>
      </div>
    </Screen>
  );
};

export default InteractiveBlock;
