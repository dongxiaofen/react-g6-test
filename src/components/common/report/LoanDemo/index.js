import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import styles from './index.less';

function LoanDemo({type}) {
  let duration;
  const getDays = ()=> {
    const now = moment();
    const then = moment('2017-07-16 23:59:59');
    duration = moment.duration(then.diff(now));
    setTimeout(getDays, 1000);
  };
  const getDemoImg = ()=> {
    return styles[type];
  };
  getDays();
  return (
    <div>
      <div className={styles.textBox}>
        <span>距离板块开放，还有
        <span className={styles.day}>{duration.days()}</span>天</span>
        <span className={styles.day}>{duration.hours() < 10 ? `0${duration.hours()}` : duration.hours()}</span>
        <span className={styles.titleSmall}>：</span>
        <span className={styles.day}>{duration.minutes()}</span>
        <span>分</span>
      </div>
      <div>
        <h3 className={styles.title}>分析样例</h3>
        <div className={getDemoImg()}></div>
      </div>
    </div>
  );
}

LoanDemo.propTypes = {
  foo: PropTypes.string,
};
export default observer(LoanDemo);
