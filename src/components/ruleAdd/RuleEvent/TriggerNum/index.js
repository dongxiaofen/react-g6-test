import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TriggerNum({ruleStore}) {
  return (
    <div className={styles.box}>
      <div className={styles.title}>发生次数大于等于</div>
      <div className={styles.content}>
        <div className={styles.inputWrap}>
          <input
            onChange={ruleStore.setAlterCount.bind(this)}
            value={ruleStore.alterCount}
            placeholder="请输入次数，次数不可为0" />
        </div>
        <div className={ruleStore.submitType === true && ruleStore.alterCount.length < 1 ? styles.validate : styles.hidden}>
          发生次数必填
        </div>
      </div>
    </div>
  );
}

TriggerNum.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(TriggerNum);
