import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.scss';
import { HomePage } from '@pages/home/ui/home-page';
import { RootLayout } from '@pages/root/root';
import { PostPage } from '@pages/post/ui/post-page';
import { ErrorPage } from '@pages/error/ui/error-page';
import { LandingPage } from '@pages/landing/ui/landing-page';
import { NavigationPage } from '@pages/navigation/ui/navigation-page';
import { Articles } from '@pages/articles/articles';
import { CreateArticle } from '@pages/create-article/create-article';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/random-post', element: <PostPage /> },
      { path: '/landing', element: <LandingPage /> },
      { path: '/navigation', element: <NavigationPage /> },
      { path: '/articles', element: <Articles /> },
      { path: '/create-article', element: <CreateArticle /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
