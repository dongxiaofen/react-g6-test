import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import EventType from './EventType';
import TriggerNum from './TriggerNum';

function RuleEvent({ruleStore}) {
  return (
    <div className={styles.box}>
      <div className={styles.message}>
        2.设置事件预警规则
      </div>
      <div className={styles.content}>
        <div className={styles.wrap}>
          <EventType ruleStore={ruleStore} />
          <TriggerNum ruleStore={ruleStore} />
        </div>
      </div>
    </div>
  );
}

RuleEvent.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(RuleEvent);
