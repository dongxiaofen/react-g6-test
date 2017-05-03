import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyName({companyName}) {
  return (
    <div className={styles.companyName}>
      {companyName}
    </div>
  );
}

CompanyName.propTypes = {
  companyName: PropTypes.string,
};
export default observer(CompanyName);
