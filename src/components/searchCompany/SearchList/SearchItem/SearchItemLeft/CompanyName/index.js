import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import LinkJump from 'components/common/LinkJump';
import styles from './index.less';

function CompanyName({itemData}) {
  // const jumpToReport = () => {
  //   const companyName = itemData.company;
  //   linkJumpStore.getCompanyExist(companyName);
  // };

  // 公司名
  let companyName = itemData.company;
  if (itemData.companyHighlight) {
    companyName = (<span dangerouslySetInnerHTML={{__html: itemData.companyHighlight}}></span>);
    // companyName = (<LinkJump name={companyName} label="公司名称" className={styles.name}></LinkJump>);
  }
  // 公司名Dom和点击跳转报告
  const companyNameDom = <LinkJump name={itemData.company} label="公司名称" className={styles.name}>{companyName}</LinkJump>;
  // companyNameDom = (
  //   {/* <div>{companyName}</div> */}
  //   <LinkJump name={companyName} label="公司名称" className={styles.name}>{companyName}</LinkJump>
  // );
  return (
    <div className={`${styles.company}`}>
      {companyNameDom}
    </div>
  );
}

CompanyName.propTypes = {
  itemData: PropTypes.object,
  linkJumpStore: PropTypes.object,
};
export default observer(CompanyName);
