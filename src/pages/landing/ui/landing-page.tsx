import { useNavigate } from 'react-router';
import styles from './landing-page.module.scss';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['example-homework']}>
      <div className="screen">
        <h2>Интересные факты про эту страницу</h2>

        <p>В ней нет смысла</p>
        <button onClick={() => navigate('#second-screen')}>
          Перейти дальше
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 3C5.89067 3 4.33333 5.5 2 8C4.33333 10.5 5.89067 13 9 13C12.1093 13 13.6667 10.5 16 8C13.6667 5.5 12.1093 3 9 3Z"
              stroke="#01010E"
              stroke-width="2"
            />
            <path
              d="M8 8C8 8.13132 8.02587 8.26136 8.07612 8.38268C8.12638 8.50401 8.20003 8.61425 8.29289 8.70711C8.38575 8.79997 8.49599 8.87362 8.61732 8.92388C8.73864 8.97413 8.86868 9 9 9C9.13132 9 9.26136 8.97413 9.38268 8.92388C9.50401 8.87362 9.61425 8.79997 9.70711 8.70711C9.79997 8.61425 9.87362 8.50401 9.92388 8.38268C9.97413 8.26136 10 8.13132 10 8C10 7.86868 9.97413 7.73864 9.92388 7.61732C9.87362 7.49599 9.79997 7.38575 9.70711 7.29289C9.61425 7.20003 9.50401 7.12638 9.38268 7.07612C9.26136 7.02587 9.13132 7 9 7C8.86868 7 8.73864 7.02587 8.61732 7.07612C8.49599 7.12638 8.38575 7.20003 8.29289 7.29289C8.20003 7.38575 8.12638 7.49599 8.07612 7.61732C8.02587 7.73864 8 7.86868 8 8Z"
              stroke="#01010E"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>

      <div
        className="screen"
        id="second-screen"
        style={{ backgroundColor: '#e0e0e0' }}
      >
        <h3>Смотрите какие карточки</h3>
        <div className="cards-container">
          <div className="card">
            <h4>Карточка 1</h4>
            <p>Пустота</p>
          </div>
          <div className="card">
            <h4>Карточка 2</h4> <p>Пустота</p>
          </div>
        </div>
      </div>

      <div className="block">
        <h5>Интерактив?</h5>
        <input type="text" placeholder="Напишите тут что-нибудь" />
        <button onClick={() => navigate('#')}>
          Вывести текст в alert
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="tomato"
          >
            <g clip-path="url(#clip0_859_20025)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315ZM8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 9H6V7H9V12H7V9Z"
              />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9 4V6H7V4H9Z" />
            </g>
            <defs>
              <clipPath id="clip0_859_20025">
                <rect width="16" height="16" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
