import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OnboardingUser from './OnboardingUser';

describe('<OnboardingUser />', () => {
  test('it should mount', () => {
    render(<OnboardingUser />);
    
    const onboardingUser = screen.getByTestId('OnboardingUser');

    expect(onboardingUser).toBeInTheDocument();
  });
});