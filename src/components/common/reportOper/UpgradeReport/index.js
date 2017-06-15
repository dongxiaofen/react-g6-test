import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function UpgradeReport({}) {
  return (
    <div className={styles.box}>
      报告即将升级，尊享更多维度信息<span>（董监高对外投资任职、关联图谱、企业历史······）</span>
    </div>
  );
}

UpgradeReport.propTypes = {
  foo: PropTypes.string,
};
export default observer(UpgradeReport);
