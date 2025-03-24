import { Screen } from '@shared/ui/screen/screen';
import styles from './cards-section.module.scss';
import { Card } from '@shared/ui/card/card';
import { forwardRef } from 'react';

type LandingCard = {
  id: string;
  title: string;
  description: string;
};

const LANDING_CARDS_DATA: LandingCard[] = [
  {
    id: 'c1',
    title: 'Карточка 1',
    description: 'Пустота',
  },
  {
    id: 'c2',
    title: 'Карточка 1',
    description: 'Пустота',
  },
];

export const CardsSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Screen className={styles['cards-section']} ref={ref} id="second-screen">
      <h2>Смотрите какие карточки</h2>
      <div className={styles['cards-container']}>
        {LANDING_CARDS_DATA.map((card) => (
          <Card className={styles['card-landing']} key={card.id}>
            <h3 className={styles['card-title']}>{card.title}</h3>
            <p className={styles['card-description']}>{card.description}</p>
          </Card>
        ))}
      </div>
    </Screen>
  );
});

