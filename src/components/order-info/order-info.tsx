import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { useParams } from 'react-router-dom';
import { getAnOrder } from '@slices';

export const OrderInfo: FC = () => {
  const { number } = useParams();

  const { anOrderLoading, modalData: orderData } = useSelector(
    (state) => state.order
  );

  const ingredients: TIngredient[] = useSelector(
    (store) => store.ingredients.data
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnOrder(Number(number)));
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || anOrderLoading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
