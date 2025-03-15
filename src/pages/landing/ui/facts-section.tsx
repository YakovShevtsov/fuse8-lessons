import Button from '@shared/ui/button/button';
import Screen from '@shared/ui/screen/screen';
import { useNavigate } from 'react-router';
import styles from './facts-section.module.scss';

const FactsSection = () => {
  const navigate = useNavigate();

  return (
    <Screen>
      <h2>Интересные факты про эту страницу</h2>
      <p>В ней нет смысла</p>
      <Button
        className={styles['facts-btn']}
        onClick={() => navigate('#second-screen')}
      >
        Перейти дальше
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
        >
          <path
            d="M9 3C5.89067 3 4.33333 5.5 2 8C4.33333 10.5 5.89067 13 9 13C12.1093 13 13.6667 10.5 16 8C13.6667 5.5 12.1093 3 9 3Z"
            stroke-width="2"
          />
          <path
            d="M8 8C8 8.13132 8.02587 8.26136 8.07612 8.38268C8.12638 8.50401 8.20003 8.61425 8.29289 8.70711C8.38575 8.79997 8.49599 8.87362 8.61732 8.92388C8.73864 8.97413 8.86868 9 9 9C9.13132 9 9.26136 8.97413 9.38268 8.92388C9.50401 8.87362 9.61425 8.79997 9.70711 8.70711C9.79997 8.61425 9.87362 8.50401 9.92388 8.38268C9.97413 8.26136 10 8.13132 10 8C10 7.86868 9.97413 7.73864 9.92388 7.61732C9.87362 7.49599 9.79997 7.38575 9.70711 7.29289C9.61425 7.20003 9.50401 7.12638 9.38268 7.07612C9.26136 7.02587 9.13132 7 9 7C8.86868 7 8.73864 7.02587 8.61732 7.07612C8.49599 7.12638 8.38575 7.20003 8.29289 7.29289C8.20003 7.38575 8.12638 7.49599 8.07612 7.61732C8.02587 7.73864 8 7.86868 8 8Z"
            stroke-width="2"
          />
        </svg>
      </Button>
    </Screen>
  );
};

export default FactsSection;
