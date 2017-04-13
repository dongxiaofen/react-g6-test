import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';

function SearchItemLeft({itemData}) {
  // 公司名
  let companyName = itemData.company;
  if (itemData.companyHighlight) {
    companyName = (<span dangerouslySetInnerHTML={{__html: itemData.companyHighlight}}></span>);
  }
  // 点击公司跳转不同路由 免费报告和非免费报告
  const quickCheck = ()=> {
    window.location.href = 'http://www.baidu.com';
  };
  const redirectReport = ()=> {
    window.location.href = 'http://www.baidu.com';
  };
  // 公司名Dom和点击跳转报告
  let companyNameDom = '';
  if (itemData.monitorStatus !== 'MONITOR' && itemData.monitorStatus !== 'PAUSE' && itemData.monitorStatus !== 'EXPIRED' && itemData.reportStatus !== 'REPORT') {
    companyNameDom = (
      <div onClick={quickCheck}>{companyName}</div>
    );
  } else {
    companyNameDom = (
      <div onClick={redirectReport}>{companyName}</div>
    );
  }
  // 监控状态 正在监控 暂停监控 已到期等
  let monitorStatus = '';
  switch (itemData.monitorStatus) {
    case 'MONITOR':
      monitorStatus = (
        <div className={`${styles.monitorStatus}`}>
          <i></i>
          <span>已加入监控</span>
        </div>
      );
      break;
    case 'PAUSE':
      monitorStatus = (
        <div className={`${styles.pauseStatus}`}>
          <i></i>
          <span>监控已暂停</span>
        </div>
      );
      break;
    case 'EXPIRED':
      monitorStatus = (
        <div className={styles.expiredStatus}>
          <i></i>
          <span>监控已到期</span>
        </div>
      );
      break;
    case 'REPORT':
      monitorStatus = (
        <div className={styles.reportStatus}>
          <span>已创建报告</span>
        </div>
      );
      break;
    default:
      break;
  }
  // 公司状态 在营 吊销等
  let companyStatus = '';
  if (itemData.companyStatus) {
    companyStatus = (
      <div className={`${styles.labelStyle}`}>
        {itemData.companyStatus}
      </div>
    );
  }
  // 股票上市相关
  let stock = '';
  if (itemData.stock) {
    const stockData = itemData.stock;
    if (stockData.stockMarket) {
      stock = (
        <div className={`${styles.labelStyle}`}>
          {stockData.stockMarket}
        </div>
      );
    }
  }
  // 风险企业
  let risk = '';
  if (itemData.riskInfo) {
    const riskInfo = itemData.riskInfo;
    if (riskInfo[0]) {
      const riskInfo0 = riskInfo[0];
      let riskText = '';
      if (riskInfo0.historyFlag !== false) {
        riskText = '请注意该企业曾用名已被平台列入高风险企业';
      } else {
        riskText = '请注意该企业已被平台列入高风险企业';
      }
      risk = (
        <Popover placement="right" content={riskText}>
          <span className={styles.riskLabel}>高风险</span>
        </Popover>
      );
    }
  }
  // 法人
  let frName = '';
  if (itemData.frName) {
    frName = itemData.frName;
  }
  // 地址
  let address = '';
  if (itemData.address) {
    address = itemData.address;
  }
  // 曾用名
  const highlight = [];
  if (itemData.highlight) {
    const KEYMAP = {'历史名称': '曾用名'};
    itemData.highlight.forEach((obj)=> {
      highlight.push(
        <span>
          {KEYMAP[obj.key] || obj.key}：<span dangerouslySetInnerHTML={{__html: obj.value}}></span>
        </span>
      );
    });
  }
  return (
    <div className={`${styles.itemLeftWrap}`}>
      <div className={`${styles.itemMessage}`}>
        <div className={`${styles.company}`}>
          {companyNameDom}
        </div>
        <div className={`${styles.monitorStyle}`}>
          {monitorStatus}
        </div>
        <div className={`${styles.companyStatus}`}>
          {companyStatus}
        </div>
        <div className={`${styles.stockStatus}`}>
          {stock}
        </div>
        <div className={`${styles.riskPopover}`}>
          {risk}
        </div>
      </div>
      <div className={`${styles.itemMessage}`}>
        <div className={`${styles.frName}`}>
          法人：{frName}
        </div>
        <div className={`${styles.address}`}>
          地址：{address}
        </div>
      </div>
      <div className={`${styles.itemMessage}`}>
        <div className={`${styles.highlight}`}>
          {highlight}
        </div>
      </div>
    </div>
  );
}

SearchItemLeft.propTypes = {
  itemData: PropTypes.object,
};
export default observer(SearchItemLeft);
