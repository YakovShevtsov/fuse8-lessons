import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.scss';
import HomePage from '@pages/home/ui/home-page';
import RootLayout from '@pages/root/root';
import PostPage from '@pages/post/ui/post-page';
import ErrorPage from '@pages/error/ui/error-page';
import LandingPage from '@pages/landing/ui/landing-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/random-post', element: <PostPage /> },
      { path: '/landing', element: <LandingPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
