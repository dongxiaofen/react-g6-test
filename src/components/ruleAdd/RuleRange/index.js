import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import RuleRangeTab from './RuleRangeTab';
import RangeContent from './RangeContent';
import Company from './Company';

function RuleRange({ruleStore}) {
  return (
    <div className={styles.box}>
      <div className={styles.message}>1.设置预警规则的，应用范围 / 企业（单选）</div>
      <div className={styles.content}>
        <RuleRangeTab ruleStore={ruleStore} />
        <RangeContent ruleStore={ruleStore} />
        <Company ruleStore={ruleStore} />
      </div>
    </div>
  );
}

RuleRange.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(RuleRange);
