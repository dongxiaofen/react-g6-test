import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyScoreList({}) {
  return (
    <div className={styles.box}>
      CompanyScoreList
    </div>
  );
}

CompanyScoreList.propTypes = {
  foo: PropTypes.string,
};
export default observer(CompanyScoreList);
