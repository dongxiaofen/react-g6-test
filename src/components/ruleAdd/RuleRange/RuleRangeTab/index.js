import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleRangeTab({ruleStore}) {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <div
          onClick={ruleStore.setSelectRange.bind(this, 'range')}
          className={`${ruleStore.selectRange === 'range' ? styles.boxBtnActive : styles.boxBtn}`}>
          <span>应用企业范围</span>
          <i></i>
        </div>
        <div
          onClick={ruleStore.setSelectRange.bind(this, 'company')}
          className={`${ruleStore.selectRange === 'company' ? styles.boxBtnActive : styles.boxBtn} ${styles.ml10}`}>
          <span>应用企业</span>
          <i></i>
        </div>
      </div>
    </div>
  );
}

RuleRangeTab.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(RuleRangeTab);
