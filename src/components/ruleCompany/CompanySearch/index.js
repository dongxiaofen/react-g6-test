import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanySearch({ruleCompanyStore}) {
  return (
    <div className={styles.box}>
      <div className={styles.text}>
        预警企业
      </div>
      <div className={styles.searchWrap}>
        <i></i>
        <input
          onChange={ruleCompanyStore.changeName.bind(this)}
          onKeyUp={ruleCompanyStore.handleEnter.bind(this)}
          value={ruleCompanyStore.searchInput}
          placeholder="输入企业名称" />
      </div>
    </div>
  );
}

CompanySearch.propTypes = {
  ruleCompanyStore: PropTypes.object,
};
export default observer(CompanySearch);
