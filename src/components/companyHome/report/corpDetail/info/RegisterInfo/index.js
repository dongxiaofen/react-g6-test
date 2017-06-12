import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, KvTable } from 'components/common/report';
// import styles from './index.less';

function RegisterInfo({ registerInfo, isLoading, errText }) {
  // 注册金
  const handleRegCap = (items) => {
    if (items.regCap === '0.0' || items.regCap === '0' || items.regCap === '' || items.regCap === undefined) {
      return '--';
    }
    return Number(items.regCap).toFixed(2) + items.unit + items.regCapCur;
  };
  // 实收资本
  const handleRecCap = (items) => {
    if (items.recCap === '0.0' || items.recCap === '0' || items.recCap === '' || items.recCap === undefined) {
      return '--';
    }
    return Number(items.recCap).toFixed(2) + items.unit + items.regCapCur;
  };
  // 行业门类
  const handleIndustryPhyName = (items) => {
    if (items.industryPhyName === '' || items.industryPhyName === undefined) {
      return '--';
    } else if (items.industryPhyCode === '' || items.industryPhyCode === undefined) {
      return items.industryPhyName;
    }
    return items.industryPhyName + '（' + items.industryPhyCode + '）';
  };
  // 国民经济行业
  const handleIndustryName = (items) => {
    if (items.industryName === '' || items.industryName === undefined) {
      return '--';
    } else if (items.industryCode === '' || items.industryCode === undefined) {
      return items.industryName;
    }
    return items.industryName + '（' + items.industryCode + '）';
  };
  // 经营期
  const handleOpenFrom = (items) => {
    if (items.openFrom === '' || items.openFrom === undefined) {
      return '--';
    }
    return items.openFrom + '至' + items.openTo;
  };
  // 注销/吊销日期
  const handleCancelDate = (items) => {
    if (items.cancelDate === '' || items.cancelDate === undefined) {
      return '--';
    }
    return items.cancelDate + '/' + items.revokeDate;
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
          { 'key': 'recCap', 'type': 'half', 'modifyBlock': handleRecCap },
        ],
        [
          { 'key': 'enterpriseStatus', 'type': 'half' },
          { 'key': 'industryPhyName', 'type': 'half', 'modifyBlock': handleIndustryPhyName},
        ],
        [
          { 'key': 'industryName', 'type': 'half', 'modifyBlock': handleIndustryName},
          { 'key': 'address', 'type': 'half' },
        ],
        [
          { 'key': 'enterpriseType', 'type': 'half' },
          { 'key': 'regOrg', 'type': 'half' },
        ],
        [
          { 'key': 'openFrom', 'type': 'half', 'modifyBlock': handleOpenFrom},
          { 'key': 'ancheDate', 'type': 'half' },
        ],
        [
          { 'key': 'cancelDate', 'type': 'half', 'modifyBlock': handleCancelDate},
          { 'key': 'abuItem', 'type': 'half' },
        ],
        [
          { 'key': 'cbuItem', 'type': 'full' },
        ],
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
