import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import EntireLoading from 'components/lib/EntireLoading';

function _EntireLoading({ entireLoadingStore }) {
  const { visible } = entireLoadingStore;
  return (
    <EntireLoading visible={visible} />
  );
}

_EntireLoading.propTypes = {
  entireLoadingStore: PropTypes.object,
};
export default inject('entireLoadingStore')(observer(_EntireLoading));
