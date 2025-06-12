import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';

export const AppHeader: FC = () => {
  const userName = useSelector((store) => store.user.data.name);

  return <AppHeaderUI userName={userName} />;
};
