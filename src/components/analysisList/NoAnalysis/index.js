import React from 'react';
import { browserHistory } from 'react-router';
import styles from './index.less';

function NoAnalysis() {
  const routeToSearch = () => {
    browserHistory.push(`/searchCompany`);
  };
  return (
    <div className={styles.wrap}>
      您还未创建分析，请前往<span onClick={routeToSearch}>搜索</span>进行创建
    </div>
  );
}

export default NoAnalysis;
