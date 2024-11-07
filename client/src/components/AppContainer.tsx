import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/hooks';

function AppContainer() {
  const { user, isLoading } = useAuth();
  return isLoading ? (
    <div>Loading...</div>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{
        redirect: window.location.pathname,
      }}
    />
  );
}

export default AppContainer;
