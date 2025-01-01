import {
  loginUser,
  registerUser,
  selectUser,
  setUser,
} from '../../../src/redux/reducers/userSlice';
import {RootState, store} from '../../../src/redux/store';

jest.mock('redux-persist', () => {
  const actualReduxPersist = jest.requireActual('redux-persist');

  return {
    ...actualReduxPersist,
    persistStore: jest.fn().mockReturnValue({}),
  };
});

describe('userSlice', () => {
  it('should handle initial state', () => {
    const state = store.getState() as RootState;
    expect(state.user).toEqual({
      user: null,
    });
  });

  it('should handle SET_USER action', () => {
    const user = {name: 'John Doe', email: 'john@gmail.com'};
    store.dispatch(setUser(user));
    const newState = store.getState() as RootState;
    expect(selectUser(newState)).toEqual(user);
  });
});

describe('Register user thunk', () => {
  it('should handle successful registration', async () => {
    const user = {name: 'John Doe', email: 'john@gmail.com'};
    const action = await store.dispatch(registerUser(user));
    const state = store.getState() as RootState;
    expect(action.type).toBe(registerUser.fulfilled.type);
    expect(selectUser(state)).toEqual(user);
  });

  it('should handle failed registration', async () => {
    const user = {name: '', email: ''}; // passing empty so that register user can be failed
    const action = await store.dispatch(registerUser(user));
    const state = store.getState() as RootState;
    expect(action.type).toBe(registerUser.rejected.type);
    expect(selectUser(state)).toBeNull();
  });
});

describe('Login user thunk', () => {
  it('should handle successful login', async () => {
    const credentials = {email: 'john@gmail.com', password: 'password'};
    const action = await store.dispatch(loginUser(credentials));
    const state = store.getState() as RootState;
    expect(action.type).toBe(loginUser.fulfilled.type);
    expect(selectUser(state)).toEqual(credentials);
  });

  it('should handle failed login', async () => {
    const credentials = {email: '', password: ''}; // passing empty so that login user can be failed
    const action = await store.dispatch(loginUser(credentials));
    const state = store.getState() as RootState;
    expect(action.type).toBe(loginUser.rejected.type);
    expect(selectUser(state)).toBeNull();
  });
});
