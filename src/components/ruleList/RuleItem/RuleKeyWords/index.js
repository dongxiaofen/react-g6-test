import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleKeyWords({data, showKeyWordId}) {
  const text = [];
  if (data && data.rule && data.rule.keywords && data.rule.keywords.length > 0) {
    data.rule.keywords.map((obj, idx)=> {
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
  const show = showKeyWordId.indexOf(data.rule.id) > -1 ? true : false;
  return (
    <div className={show ? styles.box : styles.none}>
      <div className={styles.companyList}>{textAll}</div>
    </div>
  );
}

RuleKeyWords.propTypes = {
  data: PropTypes.object,
  showKeyWordId: PropTypes.object,
};
export default observer(RuleKeyWords);
