import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
@observer
export default class History extends Component {
  static propTypes = {
    getHistory: PropTypes.func,
    historyResult: PropTypes.object,
    historyClick: PropTypes.func,
  }

  componentDidMount() {
    this.props.getHistory();
  }

  getHistory = ()=>{
    const output = [];
    const searchHistoryList = this.props.historyResult;
    if (searchHistoryList.length === 0) {
      output.push(
        <span key="null" className={`${styles.historyText}`}>无</span>
      );
    } else {
      searchHistoryList.map((obj, idx)=>{
        output.push(
          <span
            key={`${obj.type}${idx}`}
            onClick={this.handleHistoryClick.bind(this, obj)} className={`${styles.item}`}>{obj.keyword}</span>
        );
      });
    }
    return output;
  }

  handleHistoryClick = (obj)=> {
    this.props.historyClick(obj);
  }

  render() {
    return (
      <div className={`${styles.historyWrap}`}>
        <div className={`${styles.start}`}>
          <span className={`${styles.historyText}`}>历史记录</span>
        </div>
        <div className={`${styles.tip}`}>
          {this.getHistory()}
        </div>
      </div>
    );
  }
}
