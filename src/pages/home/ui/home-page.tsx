import styles from './home-page.module.scss';

export const HomePage = () => {
  return (
    <div className="container">
      <h1 className={styles['home-page-title']}>Home Page!</h1>
    </div>
  );
};