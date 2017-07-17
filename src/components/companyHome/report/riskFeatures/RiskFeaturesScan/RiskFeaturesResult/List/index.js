import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function List({data}) {
  console.log(data.status);
  return (
    <div className={styles.box}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.content1}>
            <div className={styles.title}>风险特征 1</div>
            <div className={styles.explain}>
              该风险特征在企业全库中 命中 352 次，其中 90% 涉及风险名单
            </div>
          </div>
          <div className={styles.content2}>
            <div className={styles.ruleNum}>涉及规则 2 条</div>
            <div className={styles.risk}>风险概率 90%</div>
          </div>
        </div>
        <div className={styles.right}>
          arrow
        </div>
      </div>
      <div className={styles.list}>
        
      </div>
    </div>
  );
}

List.propTypes = {
  data: PropTypes.object,
};
export default observer(List);
