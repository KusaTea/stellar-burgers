import { getOrders } from '@slices';
import { useDispatch, useSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector((store) => store.order.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
