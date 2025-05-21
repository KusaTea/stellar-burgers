import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@slices';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginError } = useSelector((store) => store.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password }));
      navigate('/', { replace: true });
    } catch (_) {}
  };

  return (
    <LoginUI
      errorText={loginError ? loginError : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
