import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@slices';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerError } = useSelector((store) => store.user);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        registerUser({ name: userName, email, password })
      ).unwrap();
      navigate('/', { replace: true });
    } catch (_) {}
  };

  return (
    <RegisterUI
      errorText={registerError ? registerError : ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
