import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleTime({data}) {
  let createTs = '';
  if (data && data.createTs) {
    createTs = data.createTs;
  }
  return (
    <div className={styles.box}>
      创建日期：{createTs}
    </div>
  );
}

RuleTime.propTypes = {
  data: PropTypes.object,
};
export default observer(RuleTime);
