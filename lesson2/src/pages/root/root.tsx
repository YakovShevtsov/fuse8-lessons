import { Outlet } from 'react-router';
import MainNavigation from '../../shared/ui/main-navigation/main-navigation';

const RootLayout = () => {
  return (
    <main>
      <MainNavigation />
      <Outlet />
    </main>
  );
};

export default RootLayout;
