import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Popover from 'antd/lib/popover';
import styles from './index.less';

function TableHead({}) {
  return (
    <div className="clearfix">
      <div className={`${styles.title} pull-left`}>
        <i className={`pull-left ${styles.warning_icon01} ${styles.nav_icon}`}></i>
        <div className={`${styles.nav_text} pull-left`}>
          <span className={styles.company}>最新预警企业 </span>
          <span className={styles.number}>TOP10</span>
        </div>
      </div>
      <div className="pull-right">
        <Popover placement="bottomRight" content="系统选取您的下属帐号中最新预警的10家企业，供您参考" trigger="hover">
          <i className={`${styles.questions_01} ${styles.questions_icon}`}></i>
        </Popover>
      </div>
    </div>
  );
}

TableHead.propTypes = {
  foo: PropTypes.string,
};
export default observer(TableHead);
