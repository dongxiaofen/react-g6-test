import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyStatus({itemData}) {
  // 公司状态 在营 吊销等
  let companyStatus = '';
  if (itemData.companyStatus) {
    companyStatus = (
      <div className={`${styles.labelStyle}`}>
        {itemData.companyStatus}
      </div>
    );
  }
  return (
    <div className={`${styles.companyStatus}`}>
      {companyStatus}
    </div>
  );
}

CompanyStatus.propTypes = {
  itemData: PropTypes.object,
};
export default observer(CompanyStatus);
