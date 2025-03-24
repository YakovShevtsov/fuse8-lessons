import { FactsSection } from './facts-section/facts-section';
import { CardsSection } from './cards-section/cards-section';
import { InteractiveBlock } from './interactive-block/interactive-block';
import styles from './landing-page.module.scss';
import { useRef } from 'react';

export const LandingPage = () => {
  const cardsSectionRef = useRef<HTMLElement>(null);

  const handleScrollToCards = () => {
    cardsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles['landing-page']}>
      <h1 className="visually-hidden">Landing page</h1>
      <FactsSection onScrollToCardsSection={handleScrollToCards} />
      <CardsSection ref={cardsSectionRef} />
      <InteractiveBlock />
    </div>
  );
};
