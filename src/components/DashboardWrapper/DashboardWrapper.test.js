import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DashboardWrapper from './DashboardWrapper';

describe('<DashboardWrapper />', () => {
  test('it should mount', () => {
    render(<DashboardWrapper />);
    
    const dashboardWrapper = screen.getByTestId('DashboardWrapper');

    expect(dashboardWrapper).toBeInTheDocument();
  });
});