import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Statistics from '../common/Statistics';
import NewAccount from './NewAccount';
import Rules from './Rules';
import Tables from '../common/Tables';

function SubAccount({ accountProfileStore }) {
  const erroeModule = (code) => {
    if (code === 404210) {
      return '子账号最新预警企业（无子账号）';
    } else if (code === 404211) {
      return '子账号最新预警账号（有子账号，未创建）';
    } else if (code === 404231) {
      return '子账号最新预警账号（有子账号，未创建）';
    }
    return '暂无信息';
  };
  const keyWords = (code) => {
    if (code === 404210) {
      return '账号中心';
    } else if (code === 404211) {
      return '';
    }else if (code === 404231) {
      return '';
    }
    return '';
  };
  const path = (code) => {
    if (code === 404210) {
      return '/accountSetting';
    } else if (code === 404211) {
      return '';
    } else if (code === 404231) {
      return '';
    }
    return '';
  };
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
    data: accountProfileStore.subWarningStatisticsData,
  };
  const warningCompnay = {
    hasScore: true,
    dateType: 'warningDate',
    data: accountProfileStore.subWarningCompnay.data && accountProfileStore.subWarningCompnay.data.length > 0 ? accountProfileStore.subWarningCompnay.data : [],
    hasFlag: false,
    companyType: 'warningCompnay',
    tip: '系统选取您的下属账号下，最新预警的10家企业，仅供参考',
    title: '最新预警企业',
    isLoading: accountProfileStore.subWarningCompnayIsLoading,
    error: !accountProfileStore.subWarningCompnay.data || accountProfileStore.subWarningCompnay.data.length === 0,
    module: erroeModule(accountProfileStore.subWarningCompnay.errorCode),
    errCategory: 3,
    errorWords: keyWords(accountProfileStore.subWarningCompnay.errorCode),
    path: path(accountProfileStore.subWarningCompnay.errorCode),
  };
  const riskCompnay = {
    hasScore: true,
    dateType: 'warning',
    data: accountProfileStore.subHighRisk.data && accountProfileStore.subHighRisk.data.length > 0 ? accountProfileStore.subHighRisk.data : [],
    hasFlag: false,
    companyType: 'riskCompnay',
    tip: '系统选取您的下属账号下，预警次数最多的10家企业，仅供参考',
    title: '预警风险排名',
    isLoading: accountProfileStore.subRiskCompnayIsLoading,
    error: !accountProfileStore.subHighRisk.data || accountProfileStore.subHighRisk.data.length === 0,
    module: erroeModule(accountProfileStore.subHighRisk.errorCode),
    errCategory: 3,
    errorWords: keyWords(accountProfileStore.subHighRisk.errorCode),
    path: path(accountProfileStore.subHighRisk.errorCode),
  };
  const lowScoreCompnay = {
    hasScore: false,
    dateType: 'comprehensive',
    data: accountProfileStore.subLowestScore.data && accountProfileStore.subLowestScore.data.length > 0 ? accountProfileStore.subLowestScore.data : [],
    hasFlag: false,
    companyType: 'lowScoreCompnay',
    tip: '系统选取您的下属账号下，评分最低的10家企业，仅供参考',
    title: '综合评分最低',
    isLoading: accountProfileStore.subLowScoreCompnayIsLoading,
    error: !accountProfileStore.subLowestScore.data || accountProfileStore.subLowestScore.data.length === 0,
    errCategory: 3,
    errorWords: keyWords(accountProfileStore.subLowestScore.errorCode),
    module: erroeModule(accountProfileStore.subLowestScore.errorCode),
    path: path(accountProfileStore.subLowestScore.errorCode),
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
