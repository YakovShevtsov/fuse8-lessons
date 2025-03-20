import Screen from '@shared/ui/screen/screen';
import styles from './interactive-block.module.scss';
import Input from '@shared/ui/input/input';
import Button from '@shared/ui/button/button';
import AlertIcon from '@shared/ui/icons/alert-icon';
import { useRef, useState } from 'react';
import Error from '@shared/ui/error/error';

const InteractiveBlock = () => {
  const [error, setError] = useState<string | null>(null);
  const alertInputRef = useRef<HTMLInputElement>(null);

  const isErrorVisible = !!error;

  const handleAlertText = () => {
    setError(null);
    if (alertInputRef.current?.value.trim()) {
      alert(alertInputRef.current?.value);
      alertInputRef.current.value = '';
    } else {
      setError('Поле для ввода не должно быть пустым');
    }
  };

  const handleResetError = () => {
    if (error !== null) {
      setError(null);
    }
  };

  return (
    <Screen>
      <h2>Интерактив?</h2>
      <div className={styles['interactive-actions']}>
        <Input
          ref={alertInputRef}
          type="text"
          placeholder="Напишите тут что-нибудь"
          onChange={handleResetError}
        />
        <Button onClick={handleAlertText}>
          Вывести текст в alert
          <AlertIcon fill="currentColor" />
        </Button>
      </div>
      <Error message={error} isVisible={isErrorVisible} />
    </Screen>
  );
};

export default InteractiveBlock;
