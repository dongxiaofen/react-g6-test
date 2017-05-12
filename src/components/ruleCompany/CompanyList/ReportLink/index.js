import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ReportLink({}) {
  return (
    <div className={styles.box}>
      查看预警分析
    </div>
  );
}

ReportLink.propTypes = {
  foo: PropTypes.string,
};
export default observer(ReportLink);
