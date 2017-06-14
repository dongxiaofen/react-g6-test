import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Statistics from '../common/Statistics';
import Tables from '../common/Tables';

function MyAccount({accountProfileStore}) {
  const statistics = {
    titleData: {
      'reportCount': '报告企业',
      'analysisCount': '分析企业',
      'monitorCount': '监控企业',
      'alertCompanyCount': '预警企业',
      'alertCount': '触发预警',
    },
    units: {
      'reportCount': '家',
      'analysisCount': '家',
      'monitorCount': '家',
      'alertCompanyCount': '家',
      'alertCount': '条',
    },
    data: accountProfileStore.ownWarningStatisticsData,
  };
  const warningCompnay = {
    hasScore: true, // 未使用
    dateType: 'warningDate',
    data: accountProfileStore.ownWarningCompnay,
    hasFlag: false,
    companyType: 'warningCompnay',
    tip: '系统选取您账号下最新预警的10家企业，仅供参考',
    title: '最新预警企业',
    isLoading: accountProfileStore.ownWarningCompnayIsLoading,
    error: accountProfileStore.ownWarningCompnay.length === 0,
    module: '我的账号最新预警企业（已创建）',
    errCategory: 3,
    errorWords: '',
    owner: 'own',
  };
  const riskCompnay = {
    hasScore: true,
    dateType: 'warning',
    data: accountProfileStore.ownHighRisk,
    hasFlag: false,
    companyType: 'riskCompnay',
    tip: '系统选取您账号下预警次数最多的10家企业，仅供参考',
    title: '预警风险排名',
    isLoading: accountProfileStore.ownRiskCompnayIsLoading,
    error: accountProfileStore.ownHighRisk.length === 0,
    module: '',
    errCategory: 3,
    errorWords: '',
    owner: 'own',
  };
  const lowScoreCompnay = {
    hasScore: false,
    dateType: 'comprehensive',
    data: accountProfileStore.ownLowestScore,
    hasFlag: false,
    companyType: 'lowScoreCompnay',
    tip: '系统选取您账号下评分最低的10家企业，仅供参考',
    title: '综合评分最低',
    isLoading: accountProfileStore.ownLowScoreCompnayIsLoading,
    error: accountProfileStore.ownLowestScore.length === 0,
    module: '',
    errCategory: 3,
    errorWords: '',
    owner: 'own',
  };
  return (
    <div className={styles.top}>
      <Statistics {...statistics} />
      <div className="clearfix">
        <Tables config = {warningCompnay} className="" />
        <Tables config = {riskCompnay} className={styles.gap} />
        <Tables config = {lowScoreCompnay} className={styles.full_box} />
      </div>
    </div>
  );
}

MyAccount.propTypes = {
  accountProfileStore: PropTypes.object,
};
export default inject('accountProfileStore')(observer(MyAccount));
