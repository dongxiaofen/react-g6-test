import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import scanCircle from 'imgs/scanCircle.png';

function BeforeScan({ funcObj, reportId }) {
  const startScan = () => {
    funcObj.getStatus(reportId);
    funcObj.scanMain(reportId);
    funcObj.scanRelated(reportId);
    funcObj.scanNetwork(reportId);
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.centerBlock}>
        <div className={styles.loadingBox}>
          <img src={scanCircle} alt="扫描..." />
        </div>
        <div className={styles.infoBox}>
          <h1>扫描企业风险，护航贷前筛选</h1>
          <p>工商系统·司法黑名单·银联黑名单·支付黑名单·税务黑名单等，500万高风险信息数据库！</p>
          <p>主体公司·重要关联关系·关键网络节点，一网打尽！</p>
          <button onClick={startScan} className={styles.scanBtn}>一键扫描</button>
        </div>
      </div>
    </div>
  );
}

export default observer(BeforeScan);
