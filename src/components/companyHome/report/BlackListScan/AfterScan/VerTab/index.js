import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function VerTab() {
  const handleMain = [];
  const conf = [
    {module: '主体公司', data: {}, handleInfo: handleMain},
    {module: '关联关系', data: {}, handleInfo: handleMain},
    {module: '网络关系', data: {}, handleInfo: handleMain},
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
        <div className={styles.abnormalItem}>
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
  return (
    <div>
      {conf.map(item => {
        return (
          <div className={styles.item}>
            <div className={styles.mainLine}>
              {item.module}
              <span className={styles.arrowUp}></span>
            </div>
            <div className={styles.mainCon}>
              <div className={styles.abnormalBox}>
                {createAbnormalList()}
              </div>
              <div className={styles.subLine}>
                以下<span>9</span>项没有问题
                <span className={styles.arrowUp}></span>
              </div>
              <div className={styles.moduleBox}>
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
