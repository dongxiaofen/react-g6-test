import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, KvTable } from 'components/common/report';
// import styles from './index.less';

function RegisterInfo({ registerInfo, isLoading, errText }) {
  // 注册金
  const handleRegCap = (items) => {
    if (items.regCap === '0.0' || items.regCap === '0' || items.regCap === '' || items.regCap === undefined || items.regCap < 0.005) {
      return '--';
    }
    if (items.regCapCur === '' || items.regCapCur === undefined || items.regCapCur === '-') {
      return Number(items.regCap).toFixed(2) + '万元';
    }
    return Number(items.regCap).toFixed(2) + '万' + '（' + items.regCapCur + '）';
  };
  // 实收资本
  // const handleRecCap = (items) => {
  //   if (items.recCap === '0.0' || items.recCap === '0' || items.recCap === '' || items.recCap === undefined || items.recCap < 0.005) {
  //     return '--';
  //   }
  //   return Number(items.recCap).toFixed(2) + items.unit + items.regCapCur;
  // };
  // 行业门类
  // const handleIndustryPhyName = (items) => {
  //   if (items.industryPhyName === '' || items.industryPhyName === undefined) {
  //     return '--';
  //   } else if (items.industryPhyCode === '' || items.industryPhyCode === undefined) {
  //     return items.industryPhyName;
  //   }
  //   return items.industryPhyName + '（' + items.industryPhyCode + '）';
  // };
  // 国民经济行业
  // const handleIndustryName = (items) => {
  //   if (items.industryName === '' || items.industryName === undefined) {
  //     return '--';
  //   } else if (items.industryCode === '' || items.industryCode === undefined) {
  //     return items.industryName;
  //   }
  //   return items.industryName + '（' + items.industryCode + '）';
  // };
  // 经营期
  const handleOpenFrom = (items) => {
    if ((items.openFrom === '' || items.openFrom === undefined) && (items.openTo === '' || items.openTo === undefined)) {
      return '--';
    }
    if (items.openFrom === '' || items.openFrom === undefined) {
      return '--至' + items.openTo;
    }
    if (items.openTo === '' || items.openTo === undefined) {
      return items.openFrom + '至--';
    }
    return items.openFrom + '至' + items.openTo;
  };
  // 注销/吊销日期
  // const handleCancelDate = (items) => {
  //   if ((items.cancelDate === '' || items.cancelDate === undefined) && (items.revokeDate === '' || items.revokeDate === undefined)) {
  //     return '--';
  //   }
  //   if (items.cancelDate === '' || items.cancelDate === undefined) {
  //     return items.revokeDate;
  //   }
  //   if (items.revokeDate === '' || items.revokeDate === undefined) {
  //     return items.cancelDate;
  //   }
  //   return items.cancelDate + '/' + items.revokeDate;
  // };
  // 经营状态
  const handleEnterpriseStatus = (items) => {
    let status = '';
    let dates = '';
    if (items.enterpriseStatus === '' || items.enterpriseStatus === undefined) {
      status = '--';
    } else {
      status = items.enterpriseStatus;
    }
    if ((items.cancelDate === '' || items.cancelDate === undefined) && (items.revokeDate === '' || items.revokeDate === undefined)) {
      dates = '';
    }
    if ((items.cancelDate === '' || items.cancelDate === undefined) && items.revokeDate) {
      dates = '（吊销日期：' + items.revokeDate + '）';
    }
    if ((items.revokeDate === '' || items.revokeDate === undefined) && items.cancelDate) {
      dates = '（注销日期：' + items.cancelDate + '）';
    }
    if (items.revokeDate && items.cancelDate) {
      dates = '（注销日期：' + items.cancelDate + '/吊销日期：' + items.revokeDate + '）';
    }
    // return
    return status + dates;
  };
  const data = {
    meta: {
      items: registerInfo[0],
      dict: 'RegisterInfo',
      body: [
        [
          { 'key': 'enterpriseName', 'type': 'half' },
          { 'key': 'regNo', 'type': 'half' },
        ],
        [
          { 'key': 'esDate', 'type': 'half' },
          { 'key': 'frName', 'type': 'half' },
        ],
        [
          { 'key': 'regCap', 'type': 'half', 'modifyBlock': handleRegCap },
          { 'key': 'enterpriseStatus', 'type': 'half', 'modifyBlock': handleEnterpriseStatus},
          // { 'key': 'recCap', 'type': 'half', 'modifyBlock': handleRecCap },
        ],
        // [
        //   // { 'key': 'industryPhyName', 'type': 'half', 'modifyBlock': handleIndustryPhyName},
        // ],
        [
          // { 'key': 'industryName', 'type': 'half', 'modifyBlock': handleIndustryName},
          { 'key': 'address', 'type': 'half' },
          { 'key': 'enterpriseType', 'type': 'half' },
        ],
        [
          { 'key': 'regOrg', 'type': 'half' },
          { 'key': 'openFrom', 'type': 'half', 'modifyBlock': handleOpenFrom},
        ],
        // [
        //   // { 'key': 'ancheDate', 'type': 'half' },
        // ],
        // [
        //   { 'key': 'cancelDate', 'type': 'half', 'modifyBlock': handleCancelDate},
        //   { 'key': 'abuItem', 'type': 'half' },
        // ],
        // [
        //   { 'key': 'cbuItem', 'type': 'full' },
        // ],
        [
          { 'key': 'operateScope', 'type': 'full' },
        ],
      ],
    },
    isLoading: isLoading,
    module: errText ? errText : '注册信息',
    error: errText || registerInfo.length === 0 ? {message: errText} : false,
  };
  return (
    <div>
      <ModuleTitle module="注册信息" />
      <KvTable {...data} />
    </div>
  );
}

RegisterInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(RegisterInfo);
