import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditProfileDetails from './EditProfileDetails';

describe('<EditProfileDetails />', () => {
  test('it should mount', () => {
    render(<EditProfileDetails />);
    
    const editProfileDetails = screen.getByTestId('EditProfileDetails');

    expect(editProfileDetails).toBeInTheDocument();
  });
});