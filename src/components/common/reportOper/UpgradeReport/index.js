import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function UpgradeReport({}) {
  return (
    <div className={styles.box}>
      您将升级为贷前高级报告<span>（包括基本信息，对外投资任职，风险信息，抵质押信息，关联图，企业历史...）</span>
    </div>
  );
}

UpgradeReport.propTypes = {
  foo: PropTypes.string,
};
export default observer(UpgradeReport);
