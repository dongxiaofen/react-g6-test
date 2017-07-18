import React from 'react';
import { observer } from 'mobx-react';
import Tooltip from 'antd/lib/tooltip';
import styles from './index.less';
import scanCircle1 from 'imgs/blackScan/scanCircle1.png';
import Processer from '../Processer';

function Scanning({ blackListScanStore }) {
  const createModule = () => {
    const scanModuleArr = [
      '行政处罚',
      '经营异常',
      '被金融机构起诉',
      '股权冻结',
      '失信记录',
      '税务黑名单',
      '银联黑名单',
      '支付黑名单',
      '老赖清单',
      '运营商黑名单',
      '企业主黑名单'
    ];
    return scanModuleArr.map((key, idx) => {
      return (
        <div key={key} className={styles.moduleItem}>
          <div className={styles.moduleImg + idx}>
            <div className={styles.shadow}></div>
            <p>{key}</p>
          </div>
          <p className={styles.scanStatus}>正在扫描...</p>
        </div>
      );
    });
  };
  const changeProcess = () => {
    blackListScanStore.processIncrease();
    console.log(blackListScanStore.process, '---process');
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
            <Tooltip title={info} placement="rightTop">
              <p>{info}</p>
            </Tooltip>
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
