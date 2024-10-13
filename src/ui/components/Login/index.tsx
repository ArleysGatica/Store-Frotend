import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaUserTag } from 'react-icons/fa';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setRole('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = isLogin ? { email, password } : { name, email, password, role };

    try {
      const response = await fetch(`/api/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error de autenticación');
      }
      localStorage.setItem('userLogin', JSON.stringify(data));
      resetForm();
      console.log('Autenticación exitosa', data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Para registrar un usuario
  const registerUser = async () => {
    const response = await fetch('http://127.0.0.1:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'Arleys Gatica',
        password: 'Hello123',
        role: 'Administrador',
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  // Para iniciar sesión
  const loginUser = async () => {
    const response = await fetch('http://127.0.0.1:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'Junior Hurtado',
        password: 'Mapamapa84',
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  // Llamar a la función para registrar o iniciar sesión
  registerUser(); // o loginUser();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="p-6 w-full max-w-md bg-gray-800 rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
          <p className="text-gray-400">
            {isLogin ? 'Ingresa tus credenciales para acceder' : 'Crea una nueva cuenta para comenzar'}
          </p>
        </div>
        <button onClick={registerUser} className="mb-4 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">
          regis...
        </button>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <FormField
                id="name"
                label="Nombre"
                icon={<FaUser />}
                placeholder="Tu nombre completo"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium text-gray-200">
                  Rol
                </label>
                <div className="relative">
                  <FaUserTag className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" />
                  <select
                    id="role"
                    className="p-2 pl-10 w-full text-white bg-gray-800 rounded-md border border-gray-700 appearance-none"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecciona un rol
                    </option>
                    <option value="caja">Caja</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <FormField
            id="email"
            label="Correo Electrónico"
            icon={<FaEnvelope />}
            placeholder="tu@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            id="password"
            label="Contraseña"
            icon={<FaLock />}
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="py-2 w-full font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
            <button onClick={toggleMode} className="ml-1 text-blue-400 hover:underline">
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

interface FormFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, icon, placeholder, type, value, onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-200">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2">{icon}</span>
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className="p-2 pl-10 w-full text-white bg-gray-800 rounded-md border border-gray-700"
      />
    </div>
  </div>
);

export default AuthForm;
