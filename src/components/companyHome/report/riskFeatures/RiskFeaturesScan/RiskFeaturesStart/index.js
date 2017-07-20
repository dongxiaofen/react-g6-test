import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import scanCircle from 'imgs/blackScan/scanCircle.png';

function RiskFeaturesStart({reportAxisStore}) {
  const clickBtn = () => {
    reportAxisStore.getScanStatusClick();
  };
  return (
    <div className={`${styles.box} clearfix`}>
      <div className={styles.left}>
        <div className={styles.img}>
          <img src={scanCircle} alt="扫描..." />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.titile}>
          扫描企业风险特征，提前预警高危企业
        </div>
        <div className={styles.content}>遍历主体企业及其关联关系所发生的历史事件行为，抓取风险名单企业独有的风险特征，为您提前预警！</div>
        <div className={reportAxisStore.canScan ? styles.button : styles.buttonNone} onClick={clickBtn}>
          开始扫描
        </div>
      </div>
    </div>
  );
}

RiskFeaturesStart.propTypes = {
  reportAxisStore: PropTypes.object,
};
export default observer(RiskFeaturesStart);
