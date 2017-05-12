import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';

function RiskLabel({riskInfo}) {
  if ( riskInfo && riskInfo.length > 0) {
    const message = riskInfo[0].historyFlag === 'false' ? '请注意该企业已被平台列入高风险企业' : '请注意该企业曾用名已被平台列入高风险企业';
    return (
      <Popover placement="bottom" trigger="hover" content={message}>
        <span className={styles.riskLabel}>高风险</span>
      </Popover>
    );
  }
  return null;
}

RiskLabel.propTypes = {
  foo: PropTypes.string,
};
export default observer(RiskLabel);
