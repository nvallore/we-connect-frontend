import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GuardedRoute from './GuardedRoute';

describe('<GuardedRoute />', () => {
  test('it should mount', () => {
    render(<GuardedRoute />);
    
    const guardedRoute = screen.getByTestId('GuardedRoute');

    expect(guardedRoute).toBeInTheDocument();
  });
});