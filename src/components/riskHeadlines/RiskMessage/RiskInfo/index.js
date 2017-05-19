import React from 'react';
import { observer, inject} from 'mobx-react';
import styles from '../index.less';
import RiskTab from './RiskTab';
import loadingComp from 'components/hoc/LoadingComp';
import LinkJump from 'components/common/LinkJump';
function RiskInfo({riskHeadlinesStore}) {
  const events = riskHeadlinesStore.events;
  const isSubCom = events.companyType === 'SUB';
  if (this.props.riskHeadlinesStore.events.info.error) {
    return <div></div>;
  }
  return (
    <div>
      <p className={isSubCom ? styles.subCom : styles.mainCom}>
        {events.info.companyName}
        <i></i>
        <LinkJump name={events.info.companyName} label={isSubCom ? '关联监控报告' : '主体监控报告'} className={styles.name} />
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
