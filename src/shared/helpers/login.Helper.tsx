// components/PrivateRoute.tsx
import { RootState } from '@/app/store';
import AuthForm from '@/ui/components/Login';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

interface IPrivateRouteProps {
  rolesAllowed: Array<'admin' | 'user' | 'root'>;
}

export const RequireAuth: React.FC<IPrivateRouteProps> = ({ rolesAllowed }) => {
  const { token, user } = useSelector((state: RootState) => state.auth.signIn);

  if (!token) {
    return <Navigate to="/login" />;
  }
  if (user && !rolesAllowed.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export const AlreadyAuthenticated: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth.signIn);

  if (token) {
    return <Navigate to="/" />;
  }
  return <AuthForm />;
};

export interface IToken {
  token: string;
  role?: string;
}
export const getUserDataFromLocalStorage = (): IToken | null => {
  const userDataString = localStorage.getItem('user');
  if (userDataString) {
    return JSON.parse(userDataString);
  } else {
    return null;
  }
};
