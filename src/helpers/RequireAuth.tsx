import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store/store';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const jwt = useSelector((e: RootState) => e.user.jwt);
  if (!jwt) {
    return <Navigate to='/auth/login' replace />;
  }
  return children;
};

export default RequireAuth;
