import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TableBody({}) {
  return (
    <div className="clearfix">
      <div className={styles}>
        <div>
          <span className={styles.score}>80分</span>
          <span className={styles.companyName}>深圳中洲集团有限公司</span>
          <span className={styles.flag}>深度分析报告</span>
        </div>
        <div>
          所属帐号：周XX（zhou@test.cn）
        </div>
      </div>
      <div className={styles.warningDate}>
        <div>最新预警日期</div>
        <div>2017-08-01</div>
      </div>
    </div>
  );
}

TableBody.propTypes = {
  foo: PropTypes.string,
};
export default observer(TableBody);
