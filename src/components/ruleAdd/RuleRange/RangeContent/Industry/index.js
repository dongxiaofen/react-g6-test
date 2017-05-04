import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Industry({ruleStore}) {
  const list = [];
  let data = ruleStore.industryList;
  if (ruleStore.industryListOrg && ruleStore.industryListOrg.length > 0) {
    data = ruleStore.industryListOrg;
  }
  if (data && data.length > 0) {
    data.map((obj, idx)=>{
      if (obj.analysis) {
        if (obj.name === ruleStore.industryActive) {
          list.push(
            <li
              onMouseDown={ruleStore.selectIndustry.bind(null, obj)}
              key={`${idx}li`}
              className={styles.listSingleActive}>
              {obj.name}
            </li>
          );
        } else {
          list.push(
            <li
              onMouseDown={ruleStore.selectIndustry.bind(null, obj)}
              key={`${idx}li`}
              className={styles.listSingle}>
              {obj.name}
            </li>
          );
        }
      }
    });
  }
  return (
    <div className={styles.box}>
      <div className={styles.title}>企业行业</div>
      <div className={styles.content}>
        <div className={styles.inputWrap}>
          <input
            tabIndex="1"
            onChange={ruleStore.changeIndustry.bind(this)}
            onFocus={ruleStore.IndustryShowStatus.bind(null, true)}
            onBlur={ruleStore.IndustryShowStatus.bind(null, false)}
            value={ruleStore.industry}
            placeholder="请选择或搜索" />
          <i className={ruleStore.industryShow ? styles.iconActive : styles.icon}></i>
        </div>
        <ul className={ruleStore.industryShow ? styles.list : styles.hidden}>
          {list}
        </ul>
      </div>
    </div>
  );
}

Industry.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(Industry);
