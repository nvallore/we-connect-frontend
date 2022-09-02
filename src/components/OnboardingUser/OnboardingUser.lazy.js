import React, { lazy, Suspense } from 'react';

const LazyOnboardingUser = lazy(() => import('./OnboardingUser'));

const OnboardingUser = props => (
  <Suspense fallback={null}>
    <LazyOnboardingUser {...props} />
  </Suspense>
);

export default OnboardingUser;
