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

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AlreadyAuthenticated>
            <AuthForm />
          </AlreadyAuthenticated>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth path="/">
            <Layout>
              <HeaderTable />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/warehouse"
        element={
          <RequireAuth>
            <Layout>
              <BranchDashboard />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/tabla"
        element={
          <Layout>
            <DataTableDemo />
          </Layout>
        }
      />

      <Route
        path="/branches"
        element={
          <Layout>
            <TableBranches />
          </Layout>
        }
      />

      <Route
        path="/branches/:Id/products"
        element={
          <Layout>
            <TableBranches />
          </Layout>
        }
      />

      {/* <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} /> */}
    </Routes>
  );
};
