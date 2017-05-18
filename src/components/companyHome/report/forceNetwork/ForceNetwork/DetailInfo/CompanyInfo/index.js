import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import Operation from '../Operation';
// import * as svgTools from 'helpers/svgTools';
// import styles from './index.less';

function CompanyInfo({forceNetworkStore}) {
  const companyInfo = forceNetworkStore.nodeInfo.company;
  const createBasicInfo = (data) => {
    const config = [
      {key: 'frName', label: '法人代表'},
      {key: 'esDate', label: '法人代表'},
      {key: 'regCap', label: '注册资本'},
    ];
    const output = [];
    config.map((item, idx)=>{
      let value = data[item.key];
      if (item.key === 'regCap') {
        value = data.regCap + data.regCapCur;
      }
      output.push(
        <p key={`basicInfo${idx}`}>{item.label}：{value}</p>
      );
    });
    return output;
  };
  const listConfig = {
    tabs: ['股东信息', '任职信息', '对外投资'],
    content: [
      {
        keys: ['name', 'invRatio'],
        data: companyInfo.shareHolderList
      },
      {
        keys: ['name', 'position'],
        data: companyInfo.personList
      },
      {
        keys: ['name', 'entInvList'],
        data: companyInfo.entInvList
      }
    ]
  };
  console.log(listConfig);
  return (
    <div>
      <p>{companyInfo.basicInfo.name}</p>
      <div>
        {createBasicInfo(companyInfo.basicInfo)}
      </div>
      <div>
        <Operation />
      </div>
    </div>
  );
}

CompanyInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('routing')(observer(CompanyInfo));
