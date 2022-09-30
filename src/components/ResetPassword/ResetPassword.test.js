import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResetPassword from './ResetPassword';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => ({
    navigate: jest.fn()
  }),
  useLocation: jest.fn(),
}));

describe('<ResetPassword />', () => {
  const initialState = { user: {
      isResetPasswordSuccess: false
  } };
    const mockStore = configureStore();
    let store;

  test('it should mount', () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ResetPassword />
      </Provider>);
    
    const resetPassword = screen.getByTestId('ResetPassword');

    expect(resetPassword).toBeInTheDocument();
  });
});