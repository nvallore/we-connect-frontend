import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OnboardingUser from './OnboardingUser';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  })
}));

describe('<OnboardingUser />', () => {

  const initialState = { user: {
    name: 'abc'
} };
  const mockStore = configureStore();
  let store;

  test('it should mount', () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <OnboardingUser />
      </Provider>
      );
    
    const onboardingUser = screen.getByTestId('OnboardingUser');

    expect(onboardingUser).toBeInTheDocument();
  });
});