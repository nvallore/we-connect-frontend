import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Slots from './Slots';

describe('<Slots />', () => {
  test('it should mount', () => {
    render(<Slots />);
    
    const slots = screen.getByTestId('Slots');

    expect(slots).toBeInTheDocument();
  });
});