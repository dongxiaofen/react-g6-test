import React from 'react';
import { observer } from 'mobx-react';
import Tooltip from 'antd/lib/tooltip';
import styles from './index.less';
import scanError from 'imgs/blackScan/scanError.png';
import scanSucc from 'imgs/blackScan/scanSucc.png';

function Header({ blackListScanStore, reportId }) {
  const succStr = '扫描完成，未命中风险名单';
  const errorStr = '扫描完成，该企业命中风险名单';
  const reScan = (canScan) => {
    if (!canScan) return false;
    blackListScanStore.resetStore();
    blackListScanStore.setValue('scanStatus.status', 'PROCESSING');
    blackListScanStore.getStatus(reportId);
  };
  const canScan = blackListScanStore.scanStatus.canScan;
  const hasRisk = ['main', 'related', 'network'].some(key => {
    return blackListScanStore.data[key].blacklistNum !== 0;
  });
  const wrapCss = hasRisk ? `${styles.wrap} ${styles.error}` : styles.wrap;
  return (
    <div className={wrapCss}>
      <img src={hasRisk ? scanError : scanSucc} alt="扫描..." />
      <div className={styles.infoBox}>
        <h1>{hasRisk ? errorStr : succStr}</h1>
        <p>已完成主体公司、关联关系、网络关系的扫描</p>
      </div>
      <div className={styles.actionBox}>
        <p>{`扫描时间：${blackListScanStore.data.main.date || '获取失败'}`}</p>
        <Tooltip title="刷新报告成功后可重新扫描" placement="rightBottom">
          <button className={canScan ? '' : styles.disable} onClick={reScan.bind(null, canScan)}>重新扫描</button>
        </Tooltip>
      </div>
    </div>
  );
}

export default observer(Header);
