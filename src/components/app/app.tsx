import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  OrderInfo,
  IngredientDetails,
  Modal,
  ProtectedRoute
} from '@components';
import {
  Routes,
  Route,
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';
import { getIngredients, getUser, resetOrderModalData } from '@slices';
import { useDispatch } from '@store';

export default function App() {
  const navigate = useNavigate();

  const handleModalClose = () => {
    navigate(-1);
    dispatch(resetOrderModalData());
  };

  const location = useLocation();
  const state = location.state;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute onlyForAuth>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute onlyForAuth>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute onlyForAuth>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {state?.background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {state?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
      {state?.background && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}
