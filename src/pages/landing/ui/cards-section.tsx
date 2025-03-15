import Screen from '@shared/ui/screen/screen';
import styles from './cards-section.module.scss';
import Card from '@shared/ui/card/card';

const CardsSection = () => {
  return (
    <Screen
      id="second-screen"
      style={{ backgroundColor: 'var(--color-secondary-700)' }}
    >
      <h2>Смотрите какие карточки</h2>
      <div className={styles['cards-container']}>
        <Card className={styles['card-landing']}>
          <h3 className={styles['card-title']}>Карточка 1</h3>
          <p className={styles['card-description']}>Пустота</p>
        </Card>
        <Card className={styles['card-landing']}>
          <h3 className={styles['card-title']}>Карточка 2</h3>
          <p className={styles['card-description']}>Пустота</p>
        </Card>
      </div>
    </Screen>
  );
};

export default CardsSection;
