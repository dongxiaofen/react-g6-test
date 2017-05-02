import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function UpdateHighOrDeep({}) {
  return (
    <div className={styles.wrap}>
      <div className={`clearfix ${styles.btnGroup}`}>
        <div className={styles.btn}>高级查询报告</div>
        <div className={styles.btn}>深度分析报告</div>
      </div>
      <div className={styles.text}>
        已选择高级查询报告
        <span className={styles.textSub}>（包含快速查询报告数据，另有关联网络、上市、新闻、团队、经营数据）</span>
      </div>
    </div>
  );
}

UpdateHighOrDeep.propTypes = {
  foo: PropTypes.string,
};
export default observer(UpdateHighOrDeep);
