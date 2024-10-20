'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '../../../app/store';
import { login, registerUser, updateSignIn } from '../../../app/slices/login';

type FormData = {
  username: string;
  password: string;
  role?: 'admin' | 'user';
};

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState<FormData>({
    username: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState<FormData>({
    username: '',
    password: '',
    role: 'user',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validateForm = (data: FormData, isRegister: boolean) => {
    const newErrors: Partial<FormData> = {};
    if (!data.username) {
      newErrors.username = 'El nombre de usuario es requerido';
    }
    if (!data.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (data.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (isRegister && !data.role) {
      newErrors.role = 'El rol es requerido' as 'admin' | 'user';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveUserData = (data: {
    token?: string;
    username: string;
    password: string;
    role?: string;
    status: string;
  }) => {
    if (!data.token) {
      store.dispatch(
        updateSignIn({
          username: '',
          password: '',
          role: '',
          status: 'unauthenticated',
        })
      );
      return;
    }

    store.dispatch(
      updateSignIn({
        token: data.token,
        username: data.username,
        password: data.password,
        role: data.role || '',
        status: 'authenticated',
      })
    );
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    isRegister: boolean
  ) => {
    event.preventDefault();
    const formData = isRegister ? registerData : loginData;

    if (!validateForm(formData, isRegister)) {
      return;
    }
    setIsLoading(true);

    try {
      const resultAction = isRegister
        ? await store.dispatch(
            login({
              username: formData.username,
              password: formData.password,
              role: formData.role ?? 'user',
            })
          )
        : await store.dispatch(
            registerUser({
              userCredentials: {
                username: formData.username,
                password: formData.password,
              },
            })
          );
      const combinedData = {
        ...resultAction.payload,
        ...loginData,
      };
      if (
        isRegister
          ? registerUser.fulfilled.match(resultAction)
          : login.fulfilled.match(resultAction)
      ) {
        if (isRegister) {
          setRegisterData({ username: '', password: '', role: 'user' });
        } else {
          setLoginData({ username: '', password: '' });
        }
      } else {
        setErrors({
          ...errors,
          [isRegister ? 'register' : 'login']: resultAction.payload as string,
        });
      }
      if (!isRegister) {
        saveUserData(combinedData);
      }

      console.log(combinedData, 'user');
    } catch (err: any) {
      setErrors({
        ...errors,
        [isRegister ? 'register' : 'login']: err.message,
      });
    } finally {
      setIsLoading(false);
      setRegisterData({ username: '', password: '', role: 'user' });
      setLoginData({ username: '', password: '' });
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    isRegister: boolean
  ) => {
    const { name, value } = event.target;
    if (isRegister) {
      setRegisterData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setLoginData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="text-white">
              Iniciar sesión
            </TabsTrigger>
            <TabsTrigger value="register" className="text-white">
              Registrarse
            </TabsTrigger>
          </TabsList>
          <div className="mt-4 bg-white shadow-xl rounded-2xl p-8">
            <TabsContent value="login">
              <form
                onSubmit={(e) => handleSubmit(e, false)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="username-login"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nombre de usuario
                  </Label>
                  <Input
                    id="username-login"
                    name="username"
                    type="text"
                    placeholder="tu_usuario"
                    value={loginData.username}
                    onChange={(e) => handleChange(e, false)}
                    className={
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    }
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password-login"
                    className="text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password-login"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => handleChange(e, false)}
                      className={`pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                      Cargando...
                    </>
                  ) : (
                    'Iniciar sesión'
                  )}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form
                onSubmit={(e) => handleSubmit(e, true)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="username-register"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nombre de usuario
                  </Label>
                  <Input
                    id="username-register"
                    name="username"
                    type="text"
                    placeholder="tu_usuario"
                    value={registerData.username}
                    onChange={(e) => handleChange(e, true)}
                    className={
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    }
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password-register"
                    className="text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password-register"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => handleChange(e, true)}
                      className={`pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role-register" className="text-right">
                    Roles
                  </Label>
                  <select
                    id="role-register"
                    name="role"
                    onChange={(e) => handleChange(e, true)}
                    value={registerData.role}
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                      Cargando...
                    </>
                  ) : (
                    'Registrarse'
                  )}
                </Button>
              </form>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
