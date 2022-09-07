import React, { lazy, Suspense } from 'react';

const LazyEditProfileDetails = lazy(() => import('./EditProfileDetails'));

const EditProfileDetails = props => (
  <Suspense fallback={null}>
    <LazyEditProfileDetails {...props} />
  </Suspense>
);

export default EditProfileDetails;
