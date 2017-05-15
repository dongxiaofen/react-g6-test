import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Statistics from '../common/Statistics';

function SubAccount({ accountProfileStore }) {
  const statistics = {
    titleData: {
      'alertCompanyCount': '预警企业',
      'alertCount': '触发预警',
      'monitorCount': '报告企业',
      'reportCount': '监控企业'
    },
    units: {
      'alertCompanyCount': '家',
      'alertCount': '条',
      'monitorCount': '家',
      'reportCount': '家'
    },
    data: accountProfileStore.subWarningStatisticsData,
  };
  return (
    <div className={styles.top}>
      <Statistics {...statistics} />
    </div>
  );
}

SubAccount.propTypes = {
  accountProfileStore: PropTypes.object,
};
export default inject('accountProfileStore')(observer(SubAccount));
