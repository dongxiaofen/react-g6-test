import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
// import styles from './index.less';
import Operation from './Operation';

function DetailInfo({forceNetworkStore}) {
  return (
    <div>
      <Operation forceNetworkStore={forceNetworkStore}/>
    </div>
  );
}

DetailInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('forceNetworkStore')(observer(DetailInfo));
