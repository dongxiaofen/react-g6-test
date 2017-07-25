import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import scanCircle1 from 'imgs/blackScan/scanCircle1.png';
import Processer from '../Processer';

function Scanning({ blackListScanStore }) {
  const createModule = () => {
    const scanModuleArr = blackListScanStore.scanModuleArr;
    return scanModuleArr.map((item, idx) => {
      return (
        <div key={item.title} className={styles.moduleItem}>
          <div className={styles.moduleImg + idx}>
            <div className={styles.shadow}></div>
            <p>{item.title}</p>
          </div>
          <p className={styles.scanStatus}>正在扫描...</p>
          <div className={styles.explain}>
            <h2>{item.title}</h2>
            <p>{item.explain}</p>
          </div>
        </div>
      );
    });
  };
  const changeProcess = () => {
    blackListScanStore.processIncrease();
  };
  const info = '500万高风险信息数据库中（工商系统 · 司法黑名单 · 银联黑名单 · 支付黑名单 · 税务黑名单等）识别企业关联网络中的风险';
  const process = blackListScanStore.process;
  return (
    <div className={styles.wrap}>
      <div className={styles.headerBox}>
        <div className={styles.scanWrap}>
          <div className={styles.imgBox}>
            <img src={scanCircle1} alt="扫描..." />
          </div>
          <div className={styles.infoBox}>
            <h1>企业扫描中，请稍后...</h1>
            <p>{info}</p>
          </div>
        </div>
        <div className={styles.processWrap}>
          <Processer process={process} processFunc={changeProcess} />
        </div>
      </div>
      <div className={styles.moduleBox}>
        {createModule()}
      </div>
    </div>
  );
}

export default observer(Scanning);
