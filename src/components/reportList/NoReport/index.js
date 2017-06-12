import React from 'react';
import { browserHistory } from 'react-router';
import styles from './index.less';

function Noreport() {
  const routeToSearch = () => {
    browserHistory.push(`/searchCompany`);
  };
  return (
    <div className={styles.wrap}>
      您还未创建报告，请前往<span onClick={routeToSearch}>搜索</span>进行创建
    </div>
  );
}

export default Noreport;
