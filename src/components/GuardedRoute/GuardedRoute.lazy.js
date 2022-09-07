import React, { lazy, Suspense } from 'react';

const LazyGuardedRoute = lazy(() => import('./GuardedRoute'));

const GuardedRoute = props => (
  <Suspense fallback={null}>
    <LazyGuardedRoute {...props} />
  </Suspense>
);

export default GuardedRoute;
