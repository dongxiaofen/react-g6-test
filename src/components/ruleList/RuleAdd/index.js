import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import styles from './index.less';

function RuleAdd({}) {
  const pushRuleAdd = () => {
    browserHistory.push('/ruleAdd');
  };
  return (
    <div className={`${styles.box}`}>
      <div className={`${styles.boxCon}`}>
        <div className={`${styles.ruleAdd}`} onClick={pushRuleAdd}>
          <i>+</i>
          <span>
            新增预警设置
          </span>
        </div>
      </div>
    </div>
  );
}

RuleAdd.propTypes = {
  foo: PropTypes.string,
};
export default observer(RuleAdd);
