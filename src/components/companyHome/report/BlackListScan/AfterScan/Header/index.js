import React from 'react';
import { observer } from 'mobx-react';
import Tooltip from 'antd/lib/tooltip';
import styles from './index.less';
import scanError from 'imgs/blackScan/scanError.png';
import scanSucc from 'imgs/blackScan/scanSucc.png';

function Header() {
  const succStr = '扫描完成，未命中风险名单';
  const errorStr = '扫描完成，该企业命中风险名单';
  const info = '500万高风险信息数据库中（工商系统 · 司法黑名单 · 银联黑名单 · 支付黑名单 · 税务黑名单等）识别企业关联网络中的风险';
  const canScan = true;
  const scanFalse = true;
  const wrapCss = scanFalse ? `${styles.wrap} ${styles.error}` : styles.wrap;
  return (
    <div className={wrapCss}>
      <img src={scanFalse ? scanError : scanSucc} alt="扫描..." />
      <div className={styles.infoBox}>
        <h1>{scanFalse ? errorStr : succStr}</h1>
        <Tooltip title={info} placement="rightBottom">
          <p>{info}</p>
        </Tooltip>
      </div>
      <div className={styles.actionBox}>
        <p>扫描时间：2012-12-12</p>
        <button className={canScan ? styles.disable : ''}>重新扫描</button>
      </div>
    </div>
  );
}

export default observer(Header);
