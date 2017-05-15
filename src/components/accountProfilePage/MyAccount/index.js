import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Statistics from '../common/Statistics';
import Tables from '../common/Tables';

function MyAccount({accountProfileStore}) {
  const statistics = {
    titleData: {
      'alertCompanyCount': '预警企业',
      'alertCount': '触发企业',
      'monitorCount': '报告企业',
      'reportCount': '监控企业'
    },
    data: accountProfileStore.ownWarningStatisticsData,
  };
  return (
    <div className={styles.top}>
      <Statistics {...statistics} />
      <Tables />
    </div>
  );
}

MyAccount.propTypes = {
  accountProfileStore: PropTypes.object,
};
export default inject('accountProfileStore')(observer(MyAccount));
