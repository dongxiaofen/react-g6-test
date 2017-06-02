import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Statistics from '../common/Statistics';
import NewAccount from './NewAccount';
import Rules from './Rules';
import Tables from '../common/Tables';

function SubAccount({ accountProfileStore }) {
  const statistics = {
    titleData: {
      'alertCompanyCount': '预警企业',
      'alertCount': '触发预警',
      'reportCount': '报告企业',
      'monitorCount': '监控企业',
    },
    units: {
      'alertCompanyCount': '家',
      'alertCount': '条',
      'reportCount': '家',
      'monitorCount': '家',
    },
    data: accountProfileStore.subWarningStatisticsData,
  };
  const warningCompnay = {
    hasScore: true,
    dateType: 'singeLine',
    data: accountProfileStore.subWarningCompnay,
    hasFlag: false,
    companyType: 'warningCompnay',
    tip: '系统选取您账号下最新预警的10家企业，仅供参考',
    title: '最新预警企业',
    isLoading: accountProfileStore.subWarningCompnayIsLoading,
    error: accountProfileStore.subWarningCompnay.length === 0,
    module: '',
  };
  const riskCompnay = {
    hasScore: true,
    dateType: 'warning',
    data: accountProfileStore.subHighRisk,
    hasFlag: false,
    companyType: 'riskCompnay',
    tip: '系统选取您账号下预警次数最多的10家企业，仅供参考',
    title: '风险企业',
    isLoading: accountProfileStore.subRiskCompnayIsLoading,
    error: accountProfileStore.subHighRisk.length === 0,
    module: '',
  };
  const lowScoreCompnay = {
    hasScore: false,
    dateType: 'comprehensive',
    data: accountProfileStore.subLowestScore,
    hasFlag: false,
    companyType: 'lowScoreCompnay',
    tip: '系统选取您账号下评分最低的10家企业，仅供参考',
    title: '综合评分最低企业',
    isLoading: accountProfileStore.subLowScoreCompnayIsLoading,
    error: accountProfileStore.subLowestScore.length === 0,
    module: '',
  };
  return (
    <div className={styles.top}>
      <div className={styles.top}>
        <Statistics {...statistics} />
        <div className="clearfix">
          <Tables config = {warningCompnay} className="" />
          <Tables config = {riskCompnay} className={styles.gap} />
          <Tables config = {lowScoreCompnay} className={styles.full_box} />
        </div>
        <div className="clearfix">
          <div className={`${styles.newAccount} pull-left`}>
             <NewAccount />
          </div>
          <div className={`${styles.rules} pull-left`}>
            <Rules />
          </div>
        </div>
      </div>
    </div>
  );
}

SubAccount.propTypes = {
  accountProfileStore: PropTypes.object,
};
export default inject('accountProfileStore')(observer(SubAccount));
