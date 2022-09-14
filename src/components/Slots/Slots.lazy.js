import React, { lazy, Suspense } from 'react';

const LazySlots = lazy(() => import('./Slots'));

const Slots = props => (
  <Suspense fallback={null}>
    <LazySlots {...props} />
  </Suspense>
);

export default Slots;
