import Button from '@shared/ui/button/button';
import Screen from '@shared/ui/screen/screen';
import styles from './facts-section.module.scss';
import EyeIcon from '@shared/ui/icons/eye-icon';

interface FactsSectionProps {
  onScrollToCardsSection: () => void;
}

const FactsSection = ({ onScrollToCardsSection }: FactsSectionProps) => {
  return (
    <Screen>
      <h2>Интересные факты про эту страницу</h2>
      <p>В ней нет смысла</p>
      <Button className={styles['facts-btn']} onClick={onScrollToCardsSection}>
        Перейти дальше
        <EyeIcon stroke="currentColor" />
      </Button>
    </Screen>
  );
};

export default FactsSection;
