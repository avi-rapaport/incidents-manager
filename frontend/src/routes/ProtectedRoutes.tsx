import { Navigate, Outlet } from 'react-router-dom';
import { useAuthMe } from '../hooks/useAuthApi';

const ProtectedRoutes = () => {
  const { isPending, isError } = useAuthMe();

  if (isPending) return <h1>Verify user...</h1>;

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
