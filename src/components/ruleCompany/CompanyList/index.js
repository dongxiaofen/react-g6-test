import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyList({}) {
  return (
    <div className={styles.box}>
      CompanyList
    </div>
  );
}

CompanyList.propTypes = {
  foo: PropTypes.string,
};
export default observer(CompanyList);
