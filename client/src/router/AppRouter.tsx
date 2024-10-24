import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import ForgotPassword from '../pages/ForgotPasswordPage';
import ResetPassword from '../pages/ResetPassword';
import AppContainer from '../components/AppContainer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
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
  {
    path: '/password/reset',
    element: <ResetPassword />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
