import React from 'react';
import styles from '../index.less';
import {observer} from 'mobx-react';

function SubCompany({data, activeComMonId, riskHeadlinesStore}) {
  const viewDetail = (monitorId) => {
    riskHeadlinesStore.riskUpdateValue('companyList', 'active', monitorId);
    riskHeadlinesStore.riskUpdateValue('events', 'companyType', 'SUB');
    riskHeadlinesStore.getCompanyInfo(monitorId, riskHeadlinesStore.filterParams);
  };
  const createList = ()=> {
    const output = [];
    data.map((item)=>{
      const companyNameCss = activeComMonId === item.monitorId ? styles.subCompanyNameAct : styles.subCompanyName;
      output.push(
        <div key={item.monitorId} className={`clearfix ${styles.subItem}`} onClick={viewDetail.bind(null, item.monitorId)}>
          <p className={companyNameCss} title={item.companyName}><span>[ 关系：{item.relationship} ]</span>{item.companyName}</p>
          <p className={styles.subEventCount}>{item.eventCount}</p>
        </div>
      );
    });
    return output;
  };
  return (
    <div>{createList()}</div>
  );
}
export default observer(SubCompany);
