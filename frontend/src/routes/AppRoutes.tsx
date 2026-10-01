import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoutes from './ProtectedRoutes';
import NotFoundPage from '../pages/NotFoundPage';
import IncidentsMapPage from '../pages/IncidentsMapPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/register" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/incidents" element={<IncidentsMapPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
