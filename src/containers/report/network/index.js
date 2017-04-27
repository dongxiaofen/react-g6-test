import React from 'react';
import AsyncComponent from 'components/common/AsyncComponent';

const loader = (cb) => {
  require.ensure([], (require) => {
    cb(require('./Network'));
  }, 'Network');
};

export default (props) =>
  <AsyncComponent {...props} loader={loader}/>;
