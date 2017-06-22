import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';

function MultiPartyMonitoring({monitorInfo}) {
  if ( monitorInfo) {
    const message = monitorInfo ? '该企业正在被其他用户监控' : '';
    return (
      <Popover placement="bottom" trigger="hover" content={message}>
        <span className={styles.riskLabel}>多方监控</span>
      </Popover>
    );
  }
  return null;
}

MultiPartyMonitoring.propTypes = {
  monitorInfo: PropTypes.object,
};
export default observer(MultiPartyMonitoring);
