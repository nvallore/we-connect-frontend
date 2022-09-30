import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DashboardWrapper from './DashboardWrapper';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

xdescribe('<DashboardWrapper />', () => {

  const initialState = { user: {
      name: 'abc'
  } };
    const mockStore = configureStore();
    let store;

  test('it should mount', () => {
    store = mockStore(initialState);

    render(<Provider store={store}><DashboardWrapper /></Provider>);
    
    const dashboardWrapper = screen.getByTestId('DashboardWrapper');

    expect(dashboardWrapper).toBeInTheDocument();
  });
});