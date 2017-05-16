import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Chart({}) {
  return (
    <div className={styles}>
      this is chart
    </div>
  );
}

Chart.propTypes = {
  foo: PropTypes.string,
};
export default observer(Chart);
