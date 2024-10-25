import { Navigate, Route, Routes } from 'react-router-dom';
import { Page404 } from '../pages/404';
import { Layout } from '../shared/components/ui/Layout';
import { HeaderTable } from '../shared/components/ui/HeaderTable';
import BranchDashboard from '../ui/components/Branches';
import { DataTableDemo } from '../ui/components/Table';
import {
  AlreadyAuthenticated,
  RequireAuth,
} from '../shared/helpers/login.Helper';
import RegisterForm from '@/ui/components/Login/RegisterForm';
import { PagesCategories } from '@/pages/Categories';
import { Page } from '@/shared/components/ui/Page';
import { Products } from '@/ui/components/Table/products';

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
              <Page center>
                <h1 className="font-mono font-semibold capitalize">
                  Welcome to Store 🎁
                </h1>
              </Page>
            </Layout>
          }
        />
      </Route>

      <Route
        path="/warehouse"
        element={<RequireAuth rolesAllowed={['root']} />}
      >
        <Route
          path="/warehouse"
          element={
            <Layout>
              <BranchDashboard />
            </Layout>
          }
        />
      </Route>

      <Route
        path="/branches"
        element={<RequireAuth rolesAllowed={['root', 'user', 'admin']} />}
      >
        <Route
          path="/branches"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
      </Route>
      <Route
        path="/branches/:Id/products"
        element={<RequireAuth rolesAllowed={['root']} />}
      >
        <Route
          path="/branches/:Id/products"
          element={
            <Layout>
              <DataTableDemo />
            </Layout>
          }
        />
      </Route>

      <Route
        path="/orders"
        element={<RequireAuth rolesAllowed={['admin', 'user', 'root']} />}
      >
        <Route
          path="/orders"
          element={
            <Layout>
              <HeaderTable />
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
      <Route
        path="/categories"
        element={<RequireAuth rolesAllowed={['root', 'admin']} />}
      >
        <Route
          path="/categories"
          element={
            <Layout>
              <PagesCategories />
            </Layout>
          }
        />
      </Route>
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};
