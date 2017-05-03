import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyName({}) {
  return (
    <div className={styles.box}>
      CompanyName
    </div>
  );
}

CompanyName.propTypes = {
  foo: PropTypes.string,
};
export default observer(CompanyName);
