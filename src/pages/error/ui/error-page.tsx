import Error from '@shared/ui/error/error';
import MainNavigation from '@shared/ui/main-navigation/main-navigation';

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An error occurred!</h1>
        <Error message="Could not find this page!" />
      </main>
    </>
  );
};

export default ErrorPage;
