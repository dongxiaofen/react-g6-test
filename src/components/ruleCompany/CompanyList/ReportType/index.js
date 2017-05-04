import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ReportType({data}) {
  // 法人
  const person = data.frName;
  // 地址
  const address = data.address;
  return (
    <div className={styles.box}>
      <span className={styles.person}>法人：{person}</span>
      <span className={styles.address}>地址：{address}</span>
    </div>
  );
}

ReportType.propTypes = {
  data: PropTypes.object,
};
export default observer(ReportType);
