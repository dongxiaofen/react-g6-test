import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
// import { browserHistory } from 'react-router';

function CompanyName({itemData}) {
  // 非免费报告
  // const hrefCompany = () => {
  //   if (itemData && itemData.reportId > 0) {
  //     browserHistory.push('/companyHome?reportId=' + itemData.reportId + '&companyType=MAIN');
  //   } else {
  //     browserHistory.push('/companyHome?monitorId=' + itemData.monitorId + '&companyType=MAIN');
  //   }
  // };
  // 公司名
  let companyName = itemData.company;
  if (itemData.companyHighlight) {
    companyName = (<span dangerouslySetInnerHTML={{__html: itemData.companyHighlight}}></span>);
  }
  // 点击公司跳转不同路由 免费报告
  // const quickCheck = ()=> {
  //   browserHistory.push('/companyHome?companyName=' + itemData.company + '&companyType=FREE');
  // };
  // 公司名Dom和点击跳转报告
  let companyNameDom = '';
  companyNameDom = (
    <div>{companyName}</div>
  );
  // if (itemData.monitorStatus !== 'MONITOR' && itemData.monitorStatus !== 'PAUSE' && itemData.monitorStatus !== 'EXPIRED' && itemData.reportStatus !== 'REPORT') {
  //   companyNameDom = (
  //     <div onClick={quickCheck}>{companyName}</div>
  //   );
  // } else {
  //   companyNameDom = (
  //     <div onClick={hrefCompany}>{companyName}</div>
  //   );
  // }
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
