import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

const Detail = () => {
  return (
    <div>Detail</div>
  );
};
Detail.propTypes = {
  apiListDetailStore: PropTypes.object,
};
export default inject('apiListDetailStore')(observer(Detail));
