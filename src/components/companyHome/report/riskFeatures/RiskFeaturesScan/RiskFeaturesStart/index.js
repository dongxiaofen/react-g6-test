import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RiskFeaturesStart({companyHomeStore, riskFeaturesStore}) {
  const clickBtn = () => {
    riskFeaturesStore.getScanStatus(companyHomeStore.reportInfo.reportId);
  };
  return (
    <div className={`${styles.box} clearfix`}>
      <div className={styles.left}>
        <div className={styles.img}></div>
      </div>
      <div className={styles.right}>
        <div className={styles.titile}>
          扫描企业风险特征，提前预警高危企业
        </div>
        <div className={styles.content}>遍历主体企业及其关联关系所发生的历史事件行为，抓取风险名单企业独有的风险特征，为您提前预警！</div>
        <div className={styles.button} onClick={clickBtn}>
          开始扫描
        </div>
      </div>
    </div>
  );
}

RiskFeaturesStart.propTypes = {
  companyHomeStore: PropTypes.object,
  riskFeaturesStore: PropTypes.object,
};
export default observer(RiskFeaturesStart);
