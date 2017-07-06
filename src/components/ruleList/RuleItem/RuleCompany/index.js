import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleCompany({data, showCompanyId}) {
  const text = [];
  if (data && data.rule && data.rule.companyNames && data.rule.companyNames.length > 0) {
    data.rule.companyNames.map((obj, idx)=> {
      text.push(
        <span className={styles.single} key={`${idx}names`}>{obj}；</span>
      );
    });
  }
  const textAll = (
    <div className={styles.all}>
      {text}
    </div>
  );
  // 判断是否需要展开
  const show = showCompanyId.indexOf(data.rule.id) > -1 ? true : false;
  return (
    <div className={show ? styles.box : styles.none}>
      <div className={styles.companyList}>{textAll}</div>
    </div>
  );
}

RuleCompany.propTypes = {
  data: PropTypes.object,
  showCompanyId: PropTypes.object,
};
export default observer(RuleCompany);
