import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Industry({}) {
  return (
    <div className={styles.box}>
      Industry
    </div>
  );
}

Industry.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(Industry);
