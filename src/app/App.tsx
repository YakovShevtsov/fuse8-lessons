import { createBrowserRouter, RouterProvider } from 'react-router';
import HomePage from '@pages/home/ui/home-page';
import './index.scss';
import RootLayout from '@pages/root/root';
import PostPage from '@pages/post/ui/post-page';
import ErrorPage from '@pages/error/ui/error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/random-post', element: <PostPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
