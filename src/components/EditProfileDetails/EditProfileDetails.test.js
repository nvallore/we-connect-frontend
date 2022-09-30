import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditProfileDetails from './EditProfileDetails';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('<EditProfileDetails />', () => {

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
      <Provider store={store}>
      <EditProfileDetails />
  </Provider>
  );
    
    const editProfileDetails = screen.getByTestId('EditProfileDetails');

    expect(editProfileDetails).toBeInTheDocument();
  });
});