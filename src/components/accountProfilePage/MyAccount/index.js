import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Statistics from '../common/Statistics';
import Tables from '../common/Tables';

function MyAccount({accountProfileStore}) {
  // 'comprehensive' || 'warning'
  // const config = {
  //   hasScore: true,
  //   dateType: 'singeLine',
  //   data:[],
  //   hasFlag: true
  //   companyType: ''
  // };

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
  const warningCompnay = {
    hasScore: true,
    dateType: 'singeLine',
    data: accountProfileStore.ownWarningCompnay,
    hasFlag: true,
    companyType: 'warningCompnay',
    tip: '系统选取您账号下最新预警的10家企业，仅供参考',
    title: '最新预警企业',
  };
  const riskCompnay = {
    hasScore: true,
    dateType: 'warning',
    data: accountProfileStore.ownHighRisk,
    hasFlag: false,
    companyType: 'riskCompnay',
    tip: '系统选取您账号下预警次数最多的10家企业，仅供参考',
    title: '风险企业',
  };
  const lowScoreCompnay = {
    hasScore: false,
    dateType: 'comprehensive',
    data: accountProfileStore.ownLowestScore,
    hasFlag: false,
    companyType: 'lowScoreCompnay',
    tip: '系统选取您账号下评分最低的10家企业，仅供参考',
    title: '综合评分最低企业',
  };
  return (
    <div className={styles.top}>
      <Statistics {...statistics} />
      <div className="clearfix">
        <Tables config = {warningCompnay} className="" />
        <Tables config = {riskCompnay} className={styles.gap} />
        <Tables config = {lowScoreCompnay} className="" />
      </div>
    </div>
  );
}

MyAccount.propTypes = {
  accountProfileStore: PropTypes.object,
};
export default inject('accountProfileStore')(observer(MyAccount));
