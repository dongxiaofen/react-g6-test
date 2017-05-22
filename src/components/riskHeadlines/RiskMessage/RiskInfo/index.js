import React from 'react';
import { observer, inject} from 'mobx-react';
import styles from '../index.less';
import RiskTab from './RiskTab';
import loadingComp from 'components/hoc/LoadingComp';
import { browserHistory } from 'react-router';
function RiskInfo({riskHeadlinesStore, searchCompanyStore}) {
  const events = riskHeadlinesStore.events;
  const isSubCom = events.companyType === 'SUB';
  const monitorId = events.info.monitorId;
  const active = riskHeadlinesStore.companyList.active;
  if (this.props.riskHeadlinesStore.events.info.error) {
    return <div></div>;
  }
  const routeToSearch = (name) => {
    searchCompanyStore.searchTabClick('COMPANY_NAME');
    searchCompanyStore.searchChange({target: {value: name}});
    searchCompanyStore.getCompanyList();
    browserHistory.push(`/searchCompany`);
  };
  const viewReport = ()=> {
    if (active.productType === 'MONITOR') {
      browserHistory.push(`/companyHome?monitorId=${monitorId}&companyType=MAIN`);
    } else if (active.productType === 'DEEP_MONITOR') {
      console.log('跳转深度报告');
    }
  };
  return (
    <div>
      <p className={isSubCom ? styles.subCom : styles.mainCom}>
        {events.info.companyName}
        <i></i>
        {
          isSubCom ? <span onClick={routeToSearch.bind(null, events.info.companyName)}>关联监控报告</span>
        : <span onClick={viewReport}>主体监控报告</span>
        }
      </p>
      <RiskTab riskHeadlinesStore={riskHeadlinesStore}/>
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: Object.keys(props.riskHeadlinesStore.events.info).length > 0 ? false : true,
  }),
})(inject('routing', 'searchCompanyStore')(observer(RiskInfo)));
