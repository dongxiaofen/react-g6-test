import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';


function Cell({theKey, theValue, type}) {
  const cssName = type === 'half' ? styles.halfCell : styles.fullCell;
  return (
    <div className={cssName}>
      <span className={styles.key}>{theKey}:</span>
      <span className={styles.value}>{theValue}</span>
    </div>
  );
}

Cell.propTypes = {
  foo: PropTypes.string,
};
export default observer(Cell);

