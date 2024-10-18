import { Navigate, Route, Routes } from 'react-router-dom';
import { Page404 } from '../pages/404';
import AuthForm from '../ui/components/Login';
import { Layout } from '../shared/components/ui/Layout';
import { HeaderTable } from '../shared/components/ui/HeaderTable';
import Dashboard from '../ui/components/Dashboard';
import WarehouseDashboard from '../ui/components/Locations';
import { DataTableDemo } from '../ui/components/Table';

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthForm />} />
      <Route
        path="/"
        element={
          <Layout>
            <HeaderTable />
          </Layout>
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
          <Layout>
            <WarehouseDashboard />
          </Layout>
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

      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};
