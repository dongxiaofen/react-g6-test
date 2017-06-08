import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyStatus({itemData}) {
  // 公司状态 在营 吊销等
  let companyStatus = '';
  if (itemData.companyStatus) {
    companyStatus = (
      <div className={`${styles.companyStatus}`}>
        企业状态：{itemData.companyStatus}
      </div>
    );
  }
  return (
    <div className={`${styles.companyStatusWrap}`}>
      {companyStatus}
    </div>
  );
}

CompanyStatus.propTypes = {
  itemData: PropTypes.object,
};
export default observer(CompanyStatus);
