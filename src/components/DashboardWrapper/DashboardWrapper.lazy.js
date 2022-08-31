import React, { lazy, Suspense } from 'react';

const LazyDashboardWrapper = lazy(() => import('./DashboardWrapper'));

const DashboardWrapper = props => (
  <Suspense fallback={null}>
    <LazyDashboardWrapper {...props} />
  </Suspense>
);

export default DashboardWrapper;
