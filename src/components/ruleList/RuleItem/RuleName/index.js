import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleName({data}) {
  let name = '';
  if (data && data.rule && data.rule.name) {
    name = data.rule.name;
  }
  return (
    <div className={styles.box}>
      {name}
    </div>
  );
}

RuleName.propTypes = {
  data: PropTypes.object,
};
export default observer(RuleName);
