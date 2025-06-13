import { describe, test, expect } from '@jest/globals';
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  userReducer
} from '@slices/userSlice';

describe('user reducer', () => {
  const initialState = {
    loading: false,
    authChecked: false,
    authenticated: false,
    data: {
      name: '',
      email: ''
    },
    registerError: null,
    loginError: null,
    authError: null
  }

  const mockRegister = {
    email: 'test@email.ru',
    name: 'Test',
    password: 'test'
  };

  const mockLogin = {
    email: 'test@email.ru',
    password: 'test'
  };

  const mockUser = {
    email: 'test@email.ru',
    name: 'Test'
  };

  describe('registerUser', () => {
    test('registerUser.pending', () => {
      const state = userReducer(initialState, registerUser.pending('pending', mockRegister));

      expect(state.registerError).toBeNull();
    });

    test('registerUser.fulfilled', () => {
      const state = userReducer(initialState, registerUser.fulfilled(mockUser, 'fulfilled', mockRegister));

      expect(state.authenticated).toBeTruthy();
      expect(state.registerError).toBeNull();
      expect(state.data).toEqual(mockUser);
    });

    test('registerUser.rejected', () => {
      const error = 'registerUser.rejected';

      const state = userReducer(initialState, registerUser.rejected(new Error(error), 'rejected', mockRegister));

      expect(state.registerError).toEqual(error);
    });
  });

  describe('loginUser', () => {
    test('loginUser.pending', () => {
      const state = userReducer(initialState, loginUser.pending('pending', mockLogin));

      expect(state.loginError).toBeNull();
    });

    test('loginUser.fulfilled', () => {
      const state = userReducer(initialState, loginUser.fulfilled(mockUser, 'fulfilled', mockLogin));

      expect(state.authenticated).toBeTruthy();
      expect(state.loginError).toBeNull();
      expect(state.data).toEqual(mockUser);
    });

    test('loginUser.rejected', () => {
      const error = 'loginUser.rejected';

      const state = userReducer(initialState, loginUser.rejected(new Error(error), 'rejected', mockLogin));

      expect(state.loginError).toEqual(error);
    });
  });

  describe('fetchUser', () => {
    test('getUser.fulfilled', () => {
      const state = userReducer(initialState, getUser.fulfilled(mockUser, 'fulfilled'));

      expect(state.authenticated).toBeTruthy();
      expect(state.authChecked).toBeTruthy();
      expect(state.data).toEqual(mockUser);
    });

    test('getUser.rejected', () => {
      const error = 'getUser.rejected';

      const state = userReducer(initialState, getUser.rejected(new Error(error), 'rejected'));

      expect(state.authenticated).toBeFalsy();
      expect(state.authChecked).toBeTruthy();
    });
  });

  describe('updateUser', () => {
    test('updateUser.fulfilled', () => {
      const state = userReducer(initialState, updateUser.fulfilled(mockUser, 'fulfilled', mockUser));

      expect(state.data).toEqual(mockUser);
    });
  });

  describe('logoutUser', () => {
    test('logoutUser.fulfilled', () => {
      const state = userReducer(initialState, logoutUser.fulfilled(undefined, 'fulfilled'));

      expect(state.authenticated).toBeFalsy();
      expect(state.data).toEqual({email: '', name: ''});
    });
  });
});