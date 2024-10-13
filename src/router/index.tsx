import { Navigate, Route, Routes } from 'react-router-dom';
import routes from './RouterList';
import { LoginPages } from '../pages/Login';
import { Page404 } from '../pages/404';

export const Router = () => {
  return (
    <Routes>
      <Route path={routes.Home.path} element={<LoginPages />} />

      <Route path={routes.Login.path} element={<LoginPages />} />

      {/* <Route path="*" element={<Navigate to="/404" />} /> */}
    </Routes>
  );
};
