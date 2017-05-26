import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Button from 'components/lib/button';
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
      <Button
        loading={ruleStore.btnLoading}
        disabled={ruleStore.btnDisable}
        className={styles.btn}
        onClick={ruleStore.createRule}>保存</Button>
    </div>
  );
}

RuleSubmit.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(RuleSubmit);
