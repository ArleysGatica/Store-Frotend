import { useAppSelector } from '@/app/hooks';

export const ProfileUser = () => {
  const user = useAppSelector((state) => state.auth.signIn.user);

  return (
    <div className="flex items-center justify-center gap-2 p-2">
      <h1 className="text-xl font-bold capitalize">{user?.username}</h1>
      <div className="flex items-center justify-center w-10 h-10 bg-green-700 rounded-full cursor-pointer">
        <span className="text-lg font-semibold text-white">
          {user?.username.charAt(0).toUpperCase() ?? 'A'}
        </span>
      </div>
    </div>
  );
};
