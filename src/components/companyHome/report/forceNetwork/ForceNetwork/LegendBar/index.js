import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function LegendBar({}) {
  return (
    <div className={styles.box}>
      LegendBar
    </div>
  );
}

LegendBar.propTypes = {
  foo: PropTypes.string,
};
export default observer(LegendBar);
