import React from 'react';

import loader from '../../img/loading.svg';

const Loader = () =>
  <div className="loader center-align animated fadeIn">
    <img src={loader} className="loader-img" alt="... loading ..." />
  </div>;

export default Loader;
