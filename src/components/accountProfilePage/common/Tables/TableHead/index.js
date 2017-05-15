import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TableHead({}) {
  return (
    <div>
      <div className={styles.title}>
        最新预警企业
        <span>TOP10</span>
      </div>
    </div>
  );
}

TableHead.propTypes = {
  foo: PropTypes.string,
};
export default observer(TableHead);
