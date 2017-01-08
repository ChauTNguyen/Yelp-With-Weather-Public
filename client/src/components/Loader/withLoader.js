import React from 'react';

import Loader from './Loader';

const withLoader = Component => ({ isLoading, ...props }) =>
  (isLoading ? <Loader /> : <Component {...props} />);

export default withLoader;
