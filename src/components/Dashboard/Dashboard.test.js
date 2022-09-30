import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from './Dashboard';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('<Dashboard />', () => {

  const initialState = { profile: {
    data: {
      name: 'abc'
    }
  } };
    const mockStore = configureStore();
    let store;

  test('it should mount', () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}><Dashboard /></Provider>);
    
    const dashboard = screen.getByTestId('Dashboard');

    expect(dashboard).toBeInTheDocument();
  });
});