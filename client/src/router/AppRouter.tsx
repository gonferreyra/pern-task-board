import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import ForgotPassword from '../pages/ForgotPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>App</div>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/email/verify/:code',
    element: <VerifyEmailPage />,
  },
  {
    path: '/password/forgot',
    element: <ForgotPassword />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
