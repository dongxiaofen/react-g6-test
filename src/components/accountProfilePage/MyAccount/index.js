import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Statistics from '../common/Statistics';
import Tables from '../common/Tables';
// import NewBusiness from '../common/NewBusiness';

function MyAccount({accountProfileStore}) {
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
    data: accountProfileStore.ownWarningStatisticsData,
  };
  return (
    <div className={styles.top}>
      <Statistics {...statistics} />
      <div className="clearfix">
        <Tables className="" />
        <Tables className={styles.gap} />
        <Tables className="" />
        {/* <div className={styles.newBusiness}>
          <NewBusiness newBusinessData={accountProfileStore.myNewBusinessData} />
        </div> */}
      </div>
    </div>
  );
}

MyAccount.propTypes = {
  accountProfileStore: PropTypes.object,
};
export default inject('accountProfileStore')(observer(MyAccount));
