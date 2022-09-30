import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from './Profile';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  }),
  useDispatch: jest.fn(),
}));

describe('<Profile />', () => {

  const initialState = { profile: {
    data: 'abc'
} };
const middlewares = [thunk]
  const mockStore = configureStore(middlewares);
  let store;

  test('it should mount', () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    
    const profile = screen.getByTestId('Profile');

    expect(profile).toBeInTheDocument();
  });
});