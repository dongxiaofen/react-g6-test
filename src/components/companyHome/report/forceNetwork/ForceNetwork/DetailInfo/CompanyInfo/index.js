import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import Operation from '../Operation';
import ListInfo from '../ListInfo';
// import * as svgTools from 'helpers/svgTools';
import styles from './index.less';

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
        <p key={`basicInfo${idx}`} className={styles.baseInfo}>{item.label}：{value}</p>
      );
    });
    return output;
  };
  const listConfig = {
    tabs: ['股东信息', '任职信息', '对外投资'],
    content: [
      {
        keys: ['name', 'invRatio'],
        data: companyInfo.shareHolderList,
        type: 'inline'
      },
      {
        keys: ['name', 'position'],
        data: companyInfo.personList,
        type: 'block'
      },
      {
        keys: ['name', 'entInvList'],
        data: companyInfo.entInvList,
        type: 'block'
      }
    ]
  };
  const isLive = companyInfo.basicInfo.status === 1;
  return (
    <div>
      <div className={`clearfix ${styles.nameWrap}`}>
        <p className={styles.companyName}>{companyInfo.basicInfo.name}</p>
        <span className={isLive ? styles.labelLive : styles.labelClose}>{isLive ? '在营' : '注销'}</span>
      </div>
      <div>
        {createBasicInfo(companyInfo.basicInfo)}
      </div>
      <div>
        <Operation />
      </div>
      <div>
        <ListInfo listData = {listConfig} />
      </div>
    </div>
  );
}

CompanyInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('routing')(observer(CompanyInfo));
