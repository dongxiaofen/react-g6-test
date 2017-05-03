import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanySearch({}) {
  return (
    <div className={styles.box}>
      <div className={styles.text}>
        预警企业
      </div>
      <div className={styles.searchWrap}>
        预警企业
      </div>
    </div>
  );
}

CompanySearch.propTypes = {
  foo: PropTypes.string,
};
export default observer(CompanySearch);
