import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';

function ReportType({data}) {
  const handleRegCap = (items) => {
    if (items.capital === '0.0' || items.capital === '0' || items.capital === '' || items.capital === undefined || items.capital < 0.005) {
      return '--';
    }
    return Number(items.capital).toFixed(2) + '万';
  };
  return (
    <div className={styles.box}>
      <span className={styles.detailItem}>{`企业状态：${data.companyStatus ? data.companyStatus : '无'}`}</span>
      <span className={styles.detailItem}>{`法人代表：${data.frName ? data.frName : '无'}`}</span>
      <span className={styles.detailItem}>{`注册资本：${data.capital ? handleRegCap(data) : '无'}`}</span>
      <span className={styles.detailItem}>{`成立日期：${data.regDt ? data.regDt : '无'}`}</span>
    </div>
  );
}

ReportType.propTypes = {
  data: PropTypes.object,
};
export default observer(ReportType);
