import React from 'react';
import { observer } from 'mobx-react';
import Tooltip from 'antd/lib/tooltip';
import styles from './index.less';
import scanError from 'imgs/blackScan/scanError.png';
import scanSucc from 'imgs/blackScan/scanSucc.png';

function Header({ blackListScanStore, reportId }) {
  const succStr = '扫描完成，未命中风险名单';
  const errorStr = '扫描完成，该企业命中风险名单';
  const info = '500万高风险信息数据库中（工商系统 · 司法黑名单 · 银联黑名单 · 支付黑名单 · 税务黑名单等）识别企业关联网络中的风险';
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
        <Tooltip title={info} placement="rightBottom">
          <p>{info}</p>
        </Tooltip>
      </div>
      <div className={styles.actionBox}>
        <p>{`扫描时间：${blackListScanStore.data.main.date || '获取失败'}`}</p>
        <button className={canScan ? '' : styles.disable} onClick={reScan.bind(null, canScan)}>重新扫描</button>
      </div>
    </div>
  );
}

export default observer(Header);
