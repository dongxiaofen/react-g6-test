import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function CountTitle({highRiskCorpStore}) {
  let totalNum = highRiskCorpStore.statistic.total_num;
  totalNum = totalNum === undefined ? <i className="fa fa-spin fa-spinner"></i> : totalNum;
  return (
    <h2 className={styles.title}>
      高风险企业
      <span className={styles.count}>（总量 {totalNum} 家）</span>
    </h2>
  );
}
export default inject('highRiskCorpStore')(observer(CountTitle));
