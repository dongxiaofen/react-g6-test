import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
function UpgradeReport({companyHomeStore}) {
  const upgradeType = companyHomeStore.upgradeType;
  return (
    <div className={styles.box}>
      {
        upgradeType === 'nav' ?
        <div>报告即将升级，尊享更多维度信息<span>（董监高对外投资任职、关联图谱、企业历史······）</span></div>
        : '请升级至高级报告，即可查看风险关联预警详情信息'
      }
    </div>
  );
}

UpgradeReport.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore')(observer(UpgradeReport));
