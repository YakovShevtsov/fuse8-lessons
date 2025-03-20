import Error from '@shared/ui/error/error';
import MainNavigation from '@shared/ui/main-navigation/main-navigation';
import styles from './error-page.module.scss';

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <div className={styles['error-page']}>
          <h1>An error occurred!</h1>
          <Error message="Could not find this page!" isVisible={true} />
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
