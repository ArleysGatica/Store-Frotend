import { useAppSelector } from '@/app/hooks';
import { fetchBranches } from '@/app/slices/branchSlice';
import { RegistroUsuario } from '@/app/slices/login';
import { store } from '@/app/store';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import { GetBranches } from '@/shared/helpers/Branchs';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface ILoginData {
  username: string;
  password: string;
  role: 'admin' | 'user' | 'root';
  sucursalId?: string;
}

const RegisterForm = () => {
  const branches = useAppSelector((state) => state.branches.data);

  const [selectedBranch, setSelectedBranch] = useState<{
    nombre: string;
    _id: string;
  } | null>(null);

  const [products, setProducts] = useState<ITablaBranch[]>([]);

  const [showPassword, setShowPassword] = useState(false);

  const handleSelectChangeBranch = (value: string) => {
    const branch = branches.find((b) => b._id === value);
    if (branch) {
      setSelectedBranch({ nombre: branch.nombre, _id: branch._id ?? '' });
    }
  };

  const fetchData = async () => {
    if (!selectedBranch) return;

    const response = await GetBranches(selectedBranch._id);
    setProducts(response);
  };

  useEffect(() => {
    store.dispatch(fetchBranches()).unwrap();
    if (selectedBranch) {
      fetchData();
    }
  }, [selectedBranch]);

  const [credentials, setCredentials] = useState<ILoginData>({
    username: '',
    password: '',
    role: 'user',
    sucursalId: '',
  });

  const handleSelectChange = (value: string) => {
    setCredentials({
      ...credentials,
      role: value as ILoginData['role'],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...credentials,
      sucursalId: selectedBranch?._id || '',
    };

    try {
      await store.dispatch(RegistroUsuario(dataToSubmit)).unwrap();
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="auth-form bg-gray-50 shadow-md rounded-lg p-6 max-w-md mx-auto mt-10 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Registrar Usuario</h1>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre de Usuario:
        </label>
        <Input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4 relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Contraseña:
        </label>
        <Input
          type={showPassword ? 'text' : 'password'}
          id="password"
          //   className='
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        <button
          type="button"
          className="absolute right-2 top-[66%] transform -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Rol:
        </label>
        <Select onValueChange={handleSelectChange} defaultValue="user">
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              <SelectItem value="user">Usuario</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="root">Root</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="branch-select"
          className="block text-sm font-medium text-gray-700"
        >
          Selecciona Sucursal:
        </label>
        <Select onValueChange={handleSelectChangeBranch}>
          <SelectTrigger>
            <SelectValue placeholder="--Selecciona--" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((branch) => (
              <SelectItem key={branch._id} value={branch._id as string}>
                {branch.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white hover:bg-blue-700"
      >
        Registrar Usuario
      </button>
    </motion.form>
  );
};

export default RegisterForm;
