import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import MessageContent from './MessageContent';
import RiskInfo from './RiskInfo';
function RiskMessage({riskHeadlinesStore, contentHeight, history}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.riskInfo}>
        <RiskInfo
          riskHeadlinesStore={riskHeadlinesStore}
          history={history}/>
      </div>
      <div>
        <MessageContent
          contentHeight={contentHeight}
          riskHeadlinesStore={riskHeadlinesStore}/>
      </div>
    </div>
  );
}

export default observer(RiskMessage);
