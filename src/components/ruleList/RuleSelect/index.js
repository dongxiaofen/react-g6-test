import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Checkbox from 'antd/lib/checkbox';

function RuleSelect({ruleStore}) {
  const ruleType = ruleStore.ruleType;
  // 是否主账号
  const mainUser = ruleStore.mainUser;
  return (
    <div className={styles.box}>
      <div className={styles.wrapper}>
        <div
          className={ruleType ? styles.filterItem : styles.activeFilterItem}
          onClick={ruleStore.setRuleType.bind(this, false)}
          >
          我的预警规则
        </div>
        {mainUser ? '' : <div
          className={ruleType ? styles.activeFilterItem : styles.filterItem}
          onClick={ruleStore.setRuleType.bind(this, true)}
          >
          上级预警规则
        </div>}
        <div className={ruleStore.ruleType ? styles.none : styles.justShow}>
          <Checkbox onChange={ruleStore.setRuleOpen.bind(this)}>
            只看开启的预警规则
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

RuleSelect.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(RuleSelect);
