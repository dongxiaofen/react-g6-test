import React from 'react';
import { observer, inject} from 'mobx-react';
import styles from '../index.less';
import RiskTab from './RiskTab';
import LinkJump from 'components/common/LinkJump';
import loadingComp from 'components/hoc/LoadingComp';
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
        <LinkJump name={events.info.companyName} label="查看企业" className={isSubCom ? styles.subJump : styles.mainJump} />
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
