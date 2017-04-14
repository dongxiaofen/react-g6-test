import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyName({itemData}) {
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
  return (
    <div className={`${styles.company}`}>
      {companyNameDom}
    </div>
  );
}

CompanyName.propTypes = {
  itemData: PropTypes.object,
};
export default observer(CompanyName);
