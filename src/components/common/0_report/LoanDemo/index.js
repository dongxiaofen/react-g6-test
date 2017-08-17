import React, { Component, PropTypes } from 'react';
import { observer, inject} from 'mobx-react';
// import moment from 'moment';
import styles from './index.less';
// let TIMER;
@inject('loaningStore')
@observer
export default class LoanDemo extends Component {
  componentWillMount() {
    // this.getDays();
  }
  componentWillUnmount() {
    // clearTimeout(TIMER);
  }
  // getDays = ()=>{
  //   const now = moment();
  //   const then = moment('2017-07-16 23:59:59');
  //   const duration = moment.duration(then.diff(now));
  //   TIMER = setTimeout(this.getDays, 1000);
  //   this.props.loaningStore.updateValue('duration.days', duration.days());
  //   this.props.loaningStore.updateValue('duration.hours', duration.hours());
  //   this.props.loaningStore.updateValue('duration.minutes', duration.minutes());
  // }
  getDemoImg = ()=>{
    return styles[this.props.type];
  }
  render() {
    // const duration = this.props.loaningStore.duration;
    return (
      <div>
        {/*<div className={styles.textBox}>
          <span>距离板块开放，还有
          <span className={styles.day}>{duration.days}</span>天</span>
          <span className={styles.day}>{duration.hours < 10 ? `0${duration.hours}` : duration.hours}</span>
          <span className={styles.flag}>:</span>
          <span className={styles.day}>{duration.minutes < 10 ? `0${duration.minutes}` : duration.minutes}</span>
          <span>分</span>
        </div>*/}
        <div>
          <h3 className={styles.title}>分析样例</h3>
          <div className={this.getDemoImg()}></div>
        </div>
      </div>
    );
  }
}
LoanDemo.propTypes = {
  foo: PropTypes.string,
  type: PropTypes.string,
  loaningStore: PropTypes.string,
};
