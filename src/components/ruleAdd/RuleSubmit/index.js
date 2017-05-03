import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleSubmit({}) {
  return (
    <div className={styles.box}>
      RuleSubmit
    </div>
  );
}

RuleSubmit.propTypes = {
  foo: PropTypes.string,
};
export default observer(RuleSubmit);
