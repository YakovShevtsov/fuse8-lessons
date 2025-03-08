import { createBrowserRouter, RouterProvider } from 'react-router';
import MainPage from '../pages/home/ui/home-page';
import './index.css';
import RootLayout from '../pages/root/root';
import PostPage from '../pages/post/ui/post-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/random-post', element: <PostPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
