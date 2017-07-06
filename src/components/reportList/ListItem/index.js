import React from 'react';
import {observer} from 'mobx-react';
import {browserHistory} from 'react-router';
import styles from './index.less';
function ListItem({data}) {
  const viewReport = (companyName) => {
    browserHistory.push(`/companyHome?companyName=${companyName}`);
  };
  const handleRegCap = (items) => {
    if (items.capital === '0.0' || items.capital === '0' || items.capital === '' || items.capital === undefined || items.capital < 0.005) {
      return '--';
    }
    return Number(items.capital).toFixed(2) + '万';
  };
  return (
    <div className={styles.item}>
      <div className={styles.colLeft}>
        <div className={styles.nameWrap}>
          <span
            className={styles.name}
            title={data.companyName}
            onClick={viewReport.bind(null, data.companyName)}>
            {data.companyName}
          </span>
        </div>
        <div className={styles.infoDetail}>
          <span className={styles.detailItem}>{`企业状态：${data.companyStatus ? data.companyStatus : '无'}`}</span>
          <span className={styles.detailItem}>{`法人代表：${data.frName ? data.frName : '无'}`}</span>
          <span className={styles.detailItem}>{`注册资本：${data.capital ? handleRegCap(data) : '无'}`}</span>
          <span className={styles.detailItem}>{`成立日期：${data.regDt ? data.regDt : '无'}`}</span>
        </div>
      </div>
      <div className={styles.colRight}>
        <div className={styles.lastModifiedTs}>
          <div className={styles.timeValue}>{data.lastModifiedTs}</div>
          <div className={styles.timeKey}>最近刷新日期</div>
        </div>
        <div className={styles.createdTs}>
          <div className={styles.timeValue}>{data.createdTs}</div>
          <div className={styles.timeKey}>创建报告日期</div>
        </div>
        <div className={styles.anTime}>
          <div className={styles.timeValue}>{data.analysisCount}</div>
          <div className={styles.timeKey}>刷新次数</div>
        </div>
      </div>
    </div>
  );
}

export default observer(ListItem);
