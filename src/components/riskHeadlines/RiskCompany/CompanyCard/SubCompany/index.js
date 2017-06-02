import React from 'react';
import styles from '../index.less';
import {observer} from 'mobx-react';

function SubCompany({data, active, riskHeadlinesStore}) {
  const viewDetail = (item) => {
    riskHeadlinesStore.riskUpdateValue('companyList', 'active', item);
    riskHeadlinesStore.riskUpdateValue('events', 'companyType', 'SUB');
    riskHeadlinesStore.getCompanyInfo(item.monitorId, riskHeadlinesStore.filterParams);
    riskHeadlinesStore.riskUpdateValue('events', 'params.index', 1);
  };
  const createList = ()=> {
    const output = [];
    data.map((item)=>{
      const companyNameCss = active.monitorId === item.monitorId ? styles.subCompanyNameAct : styles.subCompanyName;
      output.push(
        <div key={item.monitorId} className={`clearfix ${styles.subItem}`} onClick={viewDetail.bind(null, item)}>
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
