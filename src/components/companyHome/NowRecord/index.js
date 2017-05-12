import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import NowRecordList from './NowRecordList';
import NowRecordImg from './NowRecordImg';
@inject('routing', 'nowRecordStore', 'uiStore')
@observer
export default class NowRecordMain extends Component {
  static propTypes = {
    routing: PropTypes.object,
    nowRecordStore: PropTypes.object,
    uiStore: PropTypes.object,
  }
  componentDidMount() {
    const { monitorId } = this.props.routing.location.query;
    this.props.nowRecordStore.getNowRecordList(monitorId);
  }
  componentWillUnmount() {
    this.props.nowRecordStore.resetData();
  }
  render() {
    return (
      <div className={styles.box}>
        <NowRecordList
          nowRecordStore={this.props.nowRecordStore}
          uiStore={this.props.uiStore} />
        <NowRecordImg
          nowRecordStore={this.props.nowRecordStore} />
      </div>
    );
  }
}
