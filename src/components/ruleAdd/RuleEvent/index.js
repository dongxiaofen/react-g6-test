import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import EventType from './EventType';
import TriggerNum from './TriggerNum';

function RuleEvent({}) {
  return (
    <div className={styles.box}>
      <EventType />
      <TriggerNum />
    </div>
  );
}

RuleEvent.propTypes = {
  foo: PropTypes.string,
};
export default observer(RuleEvent);
