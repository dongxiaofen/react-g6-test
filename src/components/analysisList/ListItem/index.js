import React from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import styles from './index.less';
function ListItem({data}) {
  const viewReport = (companyName) => {
    browserHistory.push(`/companyHome?companyName=${companyName}`);
  };
  const keyMap = {
    SCORE: '多维综合评价',
    PROFIT: '盈利能力分析',
    OPERATION: '营运能力分析',
    GROWING: '成长能力分析',
  };
  return (
    <div className={styles.item}>
      <div className={styles.nameArea}>
        <div className={styles.companyName} onClick={viewReport.bind(null, data.companyName)}>{data.companyName}</div>
        <div>
          <span className={styles.keys}>分析模块：</span>
          <span className={styles.values}>{keyMap[data.dimension]}</span>
        </div>
      </div>
      <div className={styles.timeArea}>
        <div className={styles.timeKey}>查询日期</div>
        <div className={styles.timeValue}>{data.lastModifiedTs}</div>
      </div>
    </div>
  );
}

export default observer(ListItem);
