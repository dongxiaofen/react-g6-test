import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Popover from 'antd/lib/popover';
import styles from './index.less';

function Risk({itemData}) {
  // 风险企业
  let risk = '';
  if (itemData.riskInfo) {
    const riskInfo = itemData.riskInfo;
    if (riskInfo[0]) {
      const riskInfo0 = riskInfo[0];
      let riskText = '';
      if (riskInfo0.historyFlag !== false) {
        riskText = '请注意该企业曾用名已被平台列入高风险企业';
      } else {
        riskText = '请注意该企业已被平台列入高风险企业';
      }
      risk = (
        <Popover placement="right" content={riskText}>
          <span className={styles.riskLabel}>高风险</span>
        </Popover>
      );
    }
  }
  return (
    <div className={`${styles.riskPopover}`}>
      {risk}
    </div>
  );
}

Risk.propTypes = {
  itemData: PropTypes.object,
};
export default observer(Risk);
