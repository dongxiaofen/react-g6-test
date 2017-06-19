import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Statistics from '../common/Statistics';
import Tables from '../common/Tables';

function MyAccount({accountProfileStore}) {
  const erroeModule = (code) => {
    if (code === 404210) {
      return '子账号最新预警企业（无子账号）';
    } else if (code === 404211) {
      return '我的账号最新预警企业（未创建）';
    } else if (code === 404231) {
      return '子账号最新预警账号（有子账号，未创建）';
    } else if (code === 404213) {
      return '我的账号综合评分最低企业（未创建）';
    }
    return '暂无信息';
  };
  const keyWords = (code) => {
    if (code === 404210) {
      return '账号中心';
    } else if (code === 404211) {
      return '搜索';
    } else if (code === 404231) {
      return '';
    } else if (code === 404213) {
      return '搜索';
    }
    return '';
  };
  const path = (code) => {
    if (code === 404210) {
      return '/accountSetting';
    } else if (code === 404211) {
      return '/search';
    } else if (code === 404231) {
      return '';
    } else if (code === 404213) {
      return '/search';
    }
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
    data: accountProfileStore.ownWarningStatisticsData,
  };
  const warningCompnay = {
    hasScore: true, // 未使用
    dateType: 'warningDate',
    data: accountProfileStore.ownWarningCompnay.data && accountProfileStore.ownWarningCompnay.data.length > 0 ? accountProfileStore.ownWarningCompnay.data : [],
    hasFlag: false,
    companyType: 'warningCompnay',
    tip: '系统选取您账号下最新预警的10家企业，仅供参考',
    title: '最新预警企业',
    isLoading: accountProfileStore.ownWarningCompnayIsLoading,
    error: !accountProfileStore.ownWarningCompnay.data || accountProfileStore.ownWarningCompnay.data.length === 0,
    module: erroeModule(accountProfileStore.ownWarningCompnay.errorCode),
    errCategory: 3,
    errorWords: keyWords(accountProfileStore.ownWarningCompnay.errorCode),
    path: path(accountProfileStore.ownWarningCompnay.errorCode),
    owner: 'own',
  };
  const riskCompnay = {
    hasScore: true,
    dateType: 'warning',
    data: accountProfileStore.ownHighRisk.data && accountProfileStore.ownHighRisk.data.length > 0 ? accountProfileStore.ownHighRisk.data : [],
    hasFlag: false,
    companyType: 'riskCompnay',
    tip: '系统选取您账号下预警次数最多的10家企业，仅供参考',
    title: '预警风险排名',
    isLoading: accountProfileStore.ownRiskCompnayIsLoading,
    error: !accountProfileStore.ownHighRisk.data || accountProfileStore.ownHighRisk.data.length === 0,
    module: erroeModule(accountProfileStore.ownHighRisk.errorCode),
    errCategory: 3,
    errorWords: keyWords(accountProfileStore.ownHighRisk.errorCode),
    path: path(accountProfileStore.ownHighRisk.errorCode),
    owner: 'own',
  };
  const lowScoreCompnay = {
    hasScore: false,
    dateType: 'comprehensive',
    data: accountProfileStore.ownLowestScore.data && accountProfileStore.ownLowestScore.data.length > 0 ? accountProfileStore.ownLowestScore.data : [],
    hasFlag: false,
    companyType: 'lowScoreCompnay',
    tip: '系统选取您账号下评分最低的10家企业，仅供参考',
    title: '综合评分最低',
    isLoading: accountProfileStore.ownLowScoreCompnayIsLoading,
    error: !accountProfileStore.ownLowestScore.data || accountProfileStore.ownLowestScore.data.length === 0,
    module: erroeModule(accountProfileStore.ownLowestScore.errorCode),
    errCategory: 3,
    errorWords: keyWords(accountProfileStore.ownLowestScore.errorCode),
    path: path(accountProfileStore.ownLowestScore.errorCode),
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
