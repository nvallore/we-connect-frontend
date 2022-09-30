import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  })
}));

describe('<Navbar />', () => {

  const initialState = { user: {
      name: 'abc'
  } };
    const mockStore = configureStore();
    let store;

  test('it should mount', () => {
    store = mockStore(initialState);

    render(
      <BrowserRouter>
      <Provider store={store}>
          <Navbar />
      </Provider>
      </BrowserRouter>
      );
    
    const navbar = screen.getByTestId('Navbar');

    expect(navbar).toBeInTheDocument();
  });
});