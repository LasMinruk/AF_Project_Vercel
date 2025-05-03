import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Favorites from './pages/Favorites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/country/:code',
    element: <CountryDetail />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

export const AppRouter = () => <RouterProvider router={router} />; 