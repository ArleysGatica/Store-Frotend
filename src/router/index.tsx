import { Navigate, Route, Routes } from 'react-router-dom';
import routes from './RouterList';
import { LoginPages } from '../pages/Login';
import { Page404 } from '../pages/404';
import AuthForm from '../ui/components/Login';

export const Router = () => {
  return (
    <Routes>
      <Route path={routes.Home.path} element={<LoginPages />} />

      <Route path={routes.Login.path} element={<AuthForm />} />

      <Route path="/404" element={<Page404 />} />

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};
