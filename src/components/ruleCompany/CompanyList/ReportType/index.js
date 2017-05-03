import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ReportType({}) {
  return (
    <div className={styles.box}>
      ReportType
    </div>
  );
}

ReportType.propTypes = {
  foo: PropTypes.string,
};
export default observer(ReportType);
