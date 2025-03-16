import FactsSection from './facts-section';
import CardsSection from './cards-section';
import InteractiveBlock from './interactive-block';
import styles from './landing-page.module.scss';

const LandingPage = () => {
  return (
    <div className={styles['landing-page']}>
      <h1 className="visually-hidden">Landing page</h1>
      <FactsSection />
      <CardsSection />
      <InteractiveBlock />
    </div>
  );
};

export default LandingPage;
