import React, {Component, PropTypes} from 'react';
import styles from './index.less';
export default class FilterContent extends Component {
  static propTypes = {
    filterSheet: PropTypes.object,
  }

  componentDidMount() {
    // this.props.getHistory();
  }

  createFilter(filterSheet) {
    // const output = [];
    // let rowIndex = 0;if
    console.log(filterSheet.filterStatus, '====filterStatus');
    console.log(filterSheet.filterResult, '====filterResult');
  }

  render() {
    const filterSheet = this.props.filterSheet;
    return (
      <div className={`${styles.filterWrap}`}>
        {this.createFilter(filterSheet)}
      </div>
    );
  }
}
