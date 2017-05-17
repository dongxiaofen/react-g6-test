import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyScoreChart({}) {
  return (
    <div className={styles.box}>
      CompanyScoreChart
    </div>
  );
}

CompanyScoreChart.propTypes = {
  foo: PropTypes.string,
};
export default observer(CompanyScoreChart);
