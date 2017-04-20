import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ChartBox({ height, children }) {
  return (
    <div className={styles.chartBox} style={{ height: height }}>
      {children}
    </div>
  );
}

ChartBox.propTypes = {
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
export default observer(ChartBox);
