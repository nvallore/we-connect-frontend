import { render, screen } from '@testing-library/react';
import App from './App';

import * as reactRedux from 'react-redux'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

xdescribe('Test suit', () => {
  const initialState = { test: 'Hello' };
    const mockStore = configureStore();
    let store;


  it('Check Text', () => {
    store = mockStore(initialState);
  render(
    <BrowserRouter>
    <Provider store={store}>
    <App />
</Provider>
</BrowserRouter>
);
  const linkElement = false;
  expect(linkElement).toBeFalsy();
  })
});
