import { Outlet } from 'react-router';
import { MainNavigation } from '@shared/ui/main-navigation/main-navigation';

export const RootLayout = () => {
  return (
    <main>
      <MainNavigation />
      <Outlet />
    </main>
  );
};
