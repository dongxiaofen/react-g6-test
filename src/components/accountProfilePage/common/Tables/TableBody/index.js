import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TableBody({}) {
  // <span className={styles.score}>80分</span>
  return (
    <div className={`clearfix ${styles.singe_item}`}>
      <div className="pull-left">
        <div className={styles.right_discription}>
          <a href="#" className={styles.companyName}>1.深圳中洲集团有限公司</a>
          {/* <span className={styles.flag}>深度分析报告</span> */}
          <span className={styles.score}>86分</span>
        <div className={styles.account_user}>
          所属帐号：周XX（zhou@test.cn）
        </div>
        </div>
      </div>
      <div className={`pull-right ${styles.warningDate}`}>
        {/* <div>最新预警日期</div> */}
        <div className={styles.date}>2017-08-01</div>
      </div>
    </div>
  );
}

TableBody.propTypes = {
  className: PropTypes.string,
};
export default observer(TableBody);
