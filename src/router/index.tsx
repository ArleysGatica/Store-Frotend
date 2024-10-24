import { Navigate, Route, Routes } from 'react-router-dom';
import { Page404 } from '../pages/404';
import AuthForm from '../ui/components/Login';
import { Layout } from '../shared/components/ui/Layout';
import { HeaderTable } from '../shared/components/ui/HeaderTable';
import Dashboard from '../ui/components/Dashboard';
import BranchDashboard from '../ui/components/Branches';
import { DataTableDemo } from '../ui/components/Table';
import {
  AlreadyAuthenticated,
  RequireAuth,
} from '../shared/helpers/login.Helper';
import { TableBranches } from '../ui/components/TableBranchs';
import RegisterForm from '@/ui/components/Login/RegisterForm';

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<AlreadyAuthenticated />} />

      <Route
        path="/"
        element={<RequireAuth rolesAllowed={['admin', 'user', 'root']} />}
      >
        <Route
          path="/"
          element={
            <Layout>
              <HeaderTable />
            </Layout>
          }
        />
      </Route>
      <Route
        path="/Dashboard"
        element={<RequireAuth rolesAllowed={['admin']} />}
      >
        <Route
          path="/Dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Route>

      <Route path="/register" element={<RequireAuth rolesAllowed={['root']} />}>
        <Route
          path="/register"
          element={
            <Layout>
              <RegisterForm />
            </Layout>
          }
        />
      </Route>

      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};
