import { useEffect, useRef, useState } from 'react';
import { getUserDataFromLocalStorage, IToken } from '../helpers/login.Helper';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { updateSignIn } from '../../app/slices/login';
import { store } from '../../app/store';

export const useAuthToken = () => {
  const TOKEN_KEY = getUserDataFromLocalStorage() as IToken;
  const dateInit = TOKEN_KEY?.token;
  const [token, setToken] = useState<string | null>(dateInit);

  const navigate = useNavigate();
  const hasCheckedToken = useRef(false);

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        return setAuthenticatedUser(dateInit, false, navigate);
      }

      if (hasTokenExpired(token)) {
        setAuthenticatedUser(token, false, navigate);
      } else {
        setAuthenticatedUser(token, true, navigate);
      }
    };

    if (!hasCheckedToken.current) {
      checkToken();
      hasCheckedToken.current = true;
    }
  }, []);

  return { token };
};

const hasTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return true;
  }
};

const setAuthenticatedUser = (
  token: string,
  isAuth: boolean,
  navigate?: NavigateFunction
) => {
  //   store.dispatch(
  //     updateSignIn({
  //       token: token,
  //       username: '',
  //       password: '',
  //       role: '',
  //       status: isAuth ? 'authenticated' : 'unauthenticated',
  //     })
  //   );
  if (!isAuth && navigate) return navigate('/login');
};

export const Token = () => {
  const TOKEN_KEY = getUserDataFromLocalStorage() as IToken;
  const dateInit = TOKEN_KEY?.token;
  return dateInit;
};
