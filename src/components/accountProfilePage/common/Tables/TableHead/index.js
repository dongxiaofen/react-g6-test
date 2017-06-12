import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Popover from 'antd/lib/popover';
import styles from './index.less';

function TableHead({ companyType, tip, title }) {
  const createIcon = () => {
    if (companyType === 'warningCompnay') {
      return (styles.top10_red);
    } else if (companyType === 'riskCompnay') {
      return (styles.top10_blue);
    }else if (companyType === 'lowScoreCompnay') {
      return (styles.top10_blue);
    }
  };
  const content = (
    <div>
      <p className={styles.ppover_tittle}>排名说明</p>
      <p>{tip}</p>
    </div>
  );
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
        <Popover placement="bottomRight" content={content} trigger="hover">
          <i className={`${styles.infomation_tips} ${styles.questions_icon}`}></i>
        </Popover>
      </div>
    </div>
  );
}

TableHead.propTypes = {
  foo: PropTypes.string,
};
export default observer(TableHead);
