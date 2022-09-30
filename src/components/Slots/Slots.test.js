import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Slots from './Slots';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('<Slots />', () => {
  const initialState = { profile: {
    data: {
      name: 'abc'
    }
  } };
    const mockStore = configureStore();
    let store;
  test('it should mount', () => {
    store = mockStore(initialState);
    store.dispatch = jest.fn()

    render(
      <Provider store={store}><Slots />
      </Provider>);
    
    const slots = screen.getByTestId('Slots');

    expect(slots).toBeInTheDocument();
  });
});