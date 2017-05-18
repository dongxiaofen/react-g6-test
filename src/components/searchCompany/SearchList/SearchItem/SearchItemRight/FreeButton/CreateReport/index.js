import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CreateReport({}) {
  return (
    <div className={styles.text}>
      即将创建报告<span className={styles.textSub}>（包含工商、法务、关联网络、上市、新闻、团队、经营等数据）</span>
    </div>
  );
}

CreateReport.propTypes = {
  foo: PropTypes.string,
};
export default observer(CreateReport);
