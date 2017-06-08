import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyName({itemData}) {
  // 公司名
  let companyName = itemData.company;
  if (itemData.companyHighlight) {
    companyName = (<span dangerouslySetInnerHTML={{__html: itemData.companyHighlight}}></span>);
  }
  // 公司名Dom和点击跳转报告
  // let companyNameDom = '';
  // companyNameDom = (
  //   <div>{companyName}</div>
  // );
  return (
    <div className={`${styles.company}`}>
      {companyName}
    </div>
  );
}

CompanyName.propTypes = {
  itemData: PropTypes.object,
};
export default observer(CompanyName);
