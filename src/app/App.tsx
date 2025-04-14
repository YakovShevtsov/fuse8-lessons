import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.scss';
import { HomePage } from '@pages/home/ui/home-page';
import { RootLayout } from '@pages/root/root';
import { PostPage } from '@pages/post/ui/post-page';
import { ErrorPage } from '@pages/error/ui/error-page';
import { LandingPage } from '@pages/landing/ui/landing-page';
import { NavigationPage } from '@pages/navigation/ui/navigation-page';
import { Articles } from '@pages/articles/ui/articles-page';
import { ArticleCreation } from '@pages/article-creation/ui/article-creation-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routes } from '@shared/services/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: routes.main.pathname, element: <HomePage /> },
      { path: routes.post.pathname, element: <PostPage /> },
      { path: routes.landing.pathname, element: <LandingPage /> },
      { path: routes.navigation.pathname, element: <NavigationPage /> },
      { path: routes.articles.pathname, element: <Articles /> },
      { path: routes.createArticle.pathname, element: <ArticleCreation /> },
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
