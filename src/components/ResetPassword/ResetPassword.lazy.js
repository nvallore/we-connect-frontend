import React, { lazy, Suspense } from 'react';

const LazyResetPassword = lazy(() => import('./ResetPassword'));

const ResetPassword = props => (
  <Suspense fallback={null}>
    <LazyResetPassword {...props} />
  </Suspense>
);

export default ResetPassword;
