import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleName({ruleStore}) {
  return (
    <div className={styles.box}>
      <div className={styles.tip}>
        提示：为了准确将预警设置运用于你所监控的企业，建议结合业务经验，严禁和完整的填写
      </div>
      <div className={styles.nameWrap}>
        <div className={styles.nameContent}>
          <span className={styles.titleText}>预警名称</span>
          <input
            onChange={ruleStore.changeName} value={ruleStore.name} className={styles.inputName}
            id="name"
            placeholder="为了便于关联预警，请输入预警名称，例：工商信息" />
        </div>
        <div className={ruleStore.submitType === true && ruleStore.name.length < 1 ? styles.validate : styles.none}>
          预警名称必填
        </div>
      </div>
    </div>
  );
}

RuleName.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(RuleName);
