import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TriggerNum({}) {
  return (
    <div>

    </div>
  );
}

TriggerNum.propTypes = {
  foo: PropTypes.string,
};
export default observer(TriggerNum);
