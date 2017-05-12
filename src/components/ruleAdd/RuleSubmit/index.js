import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { browserHistory } from 'react-router';

function RuleSubmit({ruleStore}) {
  const link = () => {
    browserHistory.push('/ruleList');
  };
  return (
    <div className={styles.box}>
      <div onClick={link} className={styles.turn}>
        <i></i>
        <span>预警管理</span>
      </div>
      <div onClick={ruleStore.createRule} className={styles.btn}>
        保存
      </div>
    </div>
  );
}

RuleSubmit.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(RuleSubmit);
