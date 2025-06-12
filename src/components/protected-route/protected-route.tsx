import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '@store';
import { FC, ReactElement } from 'react';

export type TProtectedRouteProps = {
  onlyForAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyForAuth = false,
  children
}) => {
  const user = useSelector((state) => state.user);

  const location = useLocation();

  if (!user.authChecked) {
    return <Preloader />;
  }

  if (!onlyForAuth && user.data.email && user.data.name) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (onlyForAuth && (!user.data.email || !user.data.name)) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
