import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { ReactNode } from 'react';
import { useAuthToken } from '../hooks/useJWT';

type RequireAuthProps = {
  children: ReactNode;
  path?: string;
  allowedRoles?: string[];
};

export interface IToken {
  token: string;
  role?: string;
  //   status?: string;
}

export const getUserDataFromLocalStorage = (): IToken | null => {
  const userDataString = localStorage.getItem('user');
  if (userDataString) {
    return JSON.parse(userDataString);
  } else {
    return null;
  }
};

export function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const location = useLocation();
  const statusLogin = useAppSelector(
    (state: RootState) => state.auth.signIn.status
  );
  const { token } = useAuthToken();
  const userData = getUserDataFromLocalStorage();
  const userRole = userData?.role;
  //   const isAuthorized = allowedRoles?.includes(userRole || '');

  if (statusLogin === 'authenticated' && token) {
    return <>{children}</>;
  }

  return <Navigate to={'/login'} state={{ from: location }} replace />;
}

export function AlreadyAuthenticated({ children }: RequireAuthProps) {
  const userData = getUserDataFromLocalStorage();
  const statusLogin = useAppSelector(
    (state: RootState) => state.auth.signIn.status
  );

  return statusLogin === 'authenticated' && userData ? (
    <Navigate to={'/'} />
  ) : (
    <>{children}</>
  );
}
