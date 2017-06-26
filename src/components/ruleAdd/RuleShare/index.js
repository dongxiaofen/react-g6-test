import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Radio from 'antd/lib/radio';
const RadioGroup = Radio.Group;

function RuleShare({ruleStore}) {
  const onChange = (val) => {
    ruleStore.setRuleShare(val);
  };
  console.log(ruleStore.ruleShare);
  return (
    <div className={styles.box}>
      <div className={styles.message}>
        3.是否将该规则分享给您的下级帐号（将规则分享给您的下级帐号，您的下级帐号将应用该规则，并不能对该条规则进行编辑）
      </div>
      <div className={styles.content}>
        <div className={styles.wrap}>
          <RadioGroup onChange={onChange.bind(this, !ruleStore.ruleShare)} value={ruleStore.ruleShare}>
            <Radio value={Boolean(true)}>是</Radio>
            <Radio value={Boolean(false)}>否</Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

RuleShare.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(RuleShare);
