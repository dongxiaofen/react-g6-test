import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Company({}) {
  return (
    <div className={styles.box}>
      Company
    </div>
  );
}

Company.propTypes = {
  foo: PropTypes.string,
};
export default observer(Company);
