import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function LegendBar({forceNetworkStore}) {
  const expand = () => {
    forceNetworkStore.expand();
  };
  return (
    <div className={styles.box}>
      <a onClick={expand}>拓展节点</a>
    </div>
  );
}

LegendBar.propTypes = {
  foo: PropTypes.string,
};
export default inject('forceNetworkStore')(observer(LegendBar));
