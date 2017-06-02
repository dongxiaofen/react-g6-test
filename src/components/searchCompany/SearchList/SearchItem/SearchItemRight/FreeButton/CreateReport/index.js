import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CreateReport({}) {
  return (
    <div className={styles.text}>
      您即将创建报告<span className={styles.textSub}>（包含工商、法务、企业关联图，新闻，经营状况、团队等数据）</span>
    </div>
  );
}

CreateReport.propTypes = {
  foo: PropTypes.string,
};
export default observer(CreateReport);
