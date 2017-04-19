import React from 'react';
import { observer } from 'mobx-react';
import styles from '../index.less';
import RiskTab from './RiskTab';
import loadingComp from 'components/hoc/LoadingComp';
function RiskInfo({riskHeadlinesStore, history}) {
  const events = riskHeadlinesStore.events;
  const isSubCom = events.companyType === 'SUB';
  const monitorId = events.info.monitorId;
  const viewReport = ()=> {
    history.push(`/companyHome?monitorId=${monitorId}&companyType=${isSubCom ? 'ASSOCIATE' : 'MAIN'}`);
  };
  return (
    <div>
      <p className={isSubCom ? styles.subCom : styles.mainCom}>
        {events.info.companyName}
        <i></i>
        <span onClick={viewReport}>{isSubCom ? '关联监控报告' : '主体监控报告'}</span>
      </p>
      <RiskTab riskHeadlinesStore={riskHeadlinesStore}/>
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.riskHeadlinesStore.events.info.companyName ? false : true,
    error: props.riskHeadlinesStore.events.info.error,
    category: 1,
    imgCategory: 8,
    errCategory: false,
  }),
})(observer(RiskInfo));
