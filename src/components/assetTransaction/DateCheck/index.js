import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';
import styles from './index.less';

@observer
export default class DateCheck extends Component {
  static propTypes = {
    checkChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      current: '近30天'
    };
  }
  calculateDate(item) {
    let begin;
    switch (item) {
      case '近7天':
        begin = moment().subtract(6, 'days').format('YYYY-MM-DD');
        break;
      case '近30天':
        begin = moment().subtract(29, 'days').format('YYYY-MM-DD');
        break;
      case '近一季':
        begin = moment().subtract(3, 'months').format('YYYY-MM-DD');
        break;
      case '近半年':
        begin = moment().subtract(6, 'months').format('YYYY-MM-DD');
        break;
      case '近一年':
        begin = moment().subtract(1, 'years').format('YYYY-MM-DD');
        break;
      default:
        begin = moment().subtract(29, 'days').format('YYYY-MM-DD');
    }
    const end = moment().format('YYYY-MM-DD');
    return [begin, end];
  }
  checkChange(item) {
    this.setState({
      current: item
    });
    const dateRange = this.calculateDate(item);
    this.props.checkChange(dateRange, item);
  }
  render() {
    const output = [];
    ['近7天', '近30天', '近一季', '近半年', '近一年'].forEach((item, idx) => {
      output.push(
        <span
          key={`dateCheckItem-${idx}`}
          className={`${styles.dateCheckItem} ${item === this.state.current ? styles.dateCheckItemActive : ''}`}
          onClick={this.checkChange.bind(this, item)}>
          {item}
        </span>
      );
    });
    return (
      <div className={styles.dateCheck}>
        {output}
      </div>
    );
  }
}
