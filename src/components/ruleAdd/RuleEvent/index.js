import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleEvent({}) {
  return (
    <div>

    </div>
  );
}

RuleEvent.propTypes = {
  foo: PropTypes.string,
};
export default observer(RuleEvent);
