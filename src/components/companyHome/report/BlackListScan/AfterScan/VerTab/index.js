import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function VerTab({ blackListScanStore }) {
  const handleMain = [];
  const conf = [
    {name: '主体公司', key: 'main', data: {}, handleInfo: handleMain, extend: false},
    {name: '关联关系', key: 'related', data: {}, handleInfo: handleMain, extend: false},
    {name: '网络关系', key: 'network', data: {}, handleInfo: handleMain, extend: false},
  ];
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
  const createModule = () => {
    return scanModuleArr.map((key, idx) => {
      return (
        <div key={key} className={styles.moduleItem}>
          <div className={styles.moduleImg + idx}>
            <p>{key}</p>
          </div>
          <p className={styles.scanStatus}>安全</p>
        </div>
      );
    });
  };
  const createAbnormalList = () => {
    return [
      {type: '行政处罚', eventDate: '2012-01-01'},
      {type: '行政处罚', eventDate: '2012-01-01'},
    ].map((item, idx) => {
      return (
        <div key={idx} className={styles.abnormalItem}>
          <p className={styles.abnormalType + ' ' + styles.typeImg + idx}>
            <span>{item.type}</span>
            -该项共命中
            <span>58</span>
            次
          </p>
          <p className={styles.eventDate}>{`最后命中时间：${item.eventDate}`}</p>
        </div>
      );
    });
  };
  const extend = blackListScanStore.extend;
  const extendMain = (item) => {
    const ext = extend[item.key].ext;
    blackListScanStore.setValue(`extend.${item.key}.ext`, !ext);
  };
  const extendSub = (item) => {
    const subExt = extend[item.key].subExt;
    blackListScanStore.setValue(`extend.${item.key}.subExt`, !subExt);
  };
  return (
    <div>
      {conf.map(item => {
        const ext = extend[item.key].ext;
        const subExt = extend[item.key].subExt;
        return (
          <div key={item.key} className={styles.item}>
            <div className={styles.mainLine}>
              {item.name}
              <span onClick={extendMain.bind(null, item)} className={ext ? styles.arrowUp : styles.arrowDown}></span>
            </div>
            <div className={ext ? styles.mainConShow : styles.mainConHide}>
              <div className={styles.abnormalBox}>
                {createAbnormalList()}
              </div>
              <div className={styles.subLine}>
                以下<span className={styles.normalCount}>9</span>项没有问题
                <span onClick={extendSub.bind(null, item)} className={styles.arrowUp}></span>
              </div>
              <div className={subExt ? styles.moduleBoxShow : styles.moduleBoxHide}>
                {createModule()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default observer(VerTab);
