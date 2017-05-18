import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Popover from 'antd/lib/popover';
import styles from './index.less';

function TableHead({ companyType, tip, title }) {
  const createIcon = () => {
    if (companyType === 'warningCompnay') {
      return (styles.warning_icon01);
    } else if (companyType === 'riskCompnay') {
      return (styles.warning_icon02);
    }else if (companyType === 'lowScoreCompnay') {
      return (styles.warning_icon03);
    }
  };
  const createIconTips = () => {
    if (companyType === 'warningCompnay') {
      return (styles.questions_01);
    } else if (companyType === 'riskCompnay') {
      return (styles.questions_02);
    }else if (companyType === 'lowScoreCompnay') {
      return (styles.questions_03);
    }
  };
  return (
    <div className={`clearfix ${styles.head_box}`}>
      <div className={`${styles.title} pull-left`}>
        <i className={`pull-left ${createIcon()} ${styles.nav_icon}`}></i>
        <div className={`${styles.nav_text} pull-left`}>
          <span className={styles.company}>{title}</span>
          <span className={styles.number}>TOP10</span>
        </div>
      </div>
      <div className="pull-right">
        <Popover placement="bottomRight" content={tip} trigger="hover">
          <i className={`${createIconTips()} ${styles.questions_icon}`}></i>
        </Popover>
      </div>
    </div>
  );
}

TableHead.propTypes = {
  foo: PropTypes.string,
};
export default observer(TableHead);
