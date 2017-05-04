import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleCompany({}) {
  return (
    <div className={styles.box}>
      RuleCompany
    </div>
  );
}

RuleCompany.propTypes = {
  foo: PropTypes.string,
};
export default observer(RuleCompany);
