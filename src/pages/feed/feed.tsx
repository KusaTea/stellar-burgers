import { getFeeds } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const isLoading: boolean = useSelector((store) => store.feed.loading);
  const orders: TOrder[] = useSelector((store) => store.feed.data.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  return isLoading ? (
    <Preloader />
  ) : (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
