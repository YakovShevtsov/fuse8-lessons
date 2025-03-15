import styles from './landing-page.module.scss';
import FactsSection from './facts-section';
import CardsSection from './cards-section';
import InteractiveBlock from './interactive-block';

const LandingPage = () => {
  return (
    <div className={styles['example-homework']}>
      <h1 className="visually-hidden">Landing page</h1>
      <FactsSection />
      <CardsSection />
      <InteractiveBlock />
    </div>
  );
};

export default LandingPage;
