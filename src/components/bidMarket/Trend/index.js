import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Trend({}) {
  return (
    <div className={styles}>
      this is trend
    </div>
  );
}

Trend.propTypes = {
  foo: PropTypes.string,
};
export default observer(Trend);
