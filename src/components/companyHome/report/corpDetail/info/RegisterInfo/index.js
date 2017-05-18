import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, KvTable } from 'components/common/report';
// import styles from './index.less';

function RegisterInfo({ registerInfo, isLoading, errText }) {
  const handleRegCap = (items) => {
    if (items.regCap === '0.0' || items.regCap === '0' || items.regCap === '' || items.regCap === undefined) {
      return '--';
    }
    return items.regCap + items.unit + items.regCapCur;
  };
  const data = {
    meta: {
      items: registerInfo[0],
      dict: 'RegisterInfo',
      body: [
        [{ 'key': 'enterpriseName', 'type': 'half' }, { 'key': 'regNo', 'type': 'half' }],
        [{ 'key': 'orgNum', 'type': 'half' }, { 'key': 'socialCreditIdentifier', 'type': 'half' }],
        [{ 'key': 'frName', 'type': 'half' }, { 'key': 'enterpriseType', 'type': 'half' }],
        [{ 'key': 'regCap', 'type': 'half', 'modifyBlock': handleRegCap }, { 'key': 'regOrg', 'type': 'half' }],
        [{ 'key': 'enterpriseStatus', 'type': 'half' }, { 'key': 'esDate', 'type': 'half' }],
        [{ 'key': 'address', 'type': 'full' }],
        [{ 'key': 'operateScope', 'type': 'full' }],
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
