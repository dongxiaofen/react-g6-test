import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function ModelContent({}) {
  // let text = '';
  // if (ruleStore.itemData && ruleStore.itemData.rule && ruleStore.itemData.rule.ruleStatus) {
  //   text = ruleStore.itemData.rule.ruleStatus === 'USING' ? '关闭后该预警将失效' : '开启后该预警将生效';
  // }
  return (
    <div className={styles.box}>
    </div>
  );
}

ModelContent.propTypes = {
  ruleStore: PropTypes.object,
};
export default inject('ruleStore')(observer(ModelContent));
