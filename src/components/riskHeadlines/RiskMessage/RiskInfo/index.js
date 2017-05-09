import React from 'react';
import { observer, inject} from 'mobx-react';
import styles from '../index.less';
import RiskTab from './RiskTab';
import loadingComp from 'components/hoc/LoadingComp';
function RiskInfo({riskHeadlinesStore, routing}) {
  const events = riskHeadlinesStore.events;
  const isSubCom = events.companyType === 'SUB';
  const monitorId = events.info.monitorId;
  const viewReport = ()=> {
    routing.history.push(`/companyHome?monitorId=${monitorId}&companyType=${isSubCom ? 'ASSOCIATE' : 'MAIN'}s`);
  };
  if (this.props.riskHeadlinesStore.events.info.error) {
    return <div></div>;
  }
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
    loading: Object.keys(props.riskHeadlinesStore.events.info).length > 0 ? false : true,
  }),
})(inject('routing')(observer(RiskInfo)));
