import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('<Login />', () => {

  const initialState = { user: {
    isLoginSuccess: false,
    isFirstTimeLogin: true
  } };
  const mockStore = configureStore();
  let store;

  test('it should mount', () => {
    store = mockStore(initialState);

    render(<Provider store={store}><Login /></Provider>);
    
    const login = screen.getByTestId('Login');

    expect(login).toBeInTheDocument();
  });
});