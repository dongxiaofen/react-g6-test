import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import NowRecordList from './NowRecordList';
import NowRecordImg from './NowRecordImg';
@inject('routing', 'nowRecordStore', 'uiStore', 'bannerStore')
@observer
export default class NowRecordMain extends Component {
  static propTypes = {
    routing: PropTypes.object,
    nowRecordStore: PropTypes.object,
    uiStore: PropTypes.object,
    bannerStore: PropTypes.object,
  }
  componentWillMount() {
    this.props.nowRecordStore.resetStore();
  }
  componentDidMount() {
    const { companyName } = this.props.routing.location.query;
    if (this.props.bannerStore && this.props.bannerStore.bannerInfoData && this.props.bannerStore.bannerInfoData.companyId) {
      this.props.nowRecordStore.getNowRecordList(this.props.bannerStore.bannerInfoData.companyId);
    } else {
      // 当无法获取companyId时重新请求banner,并获取现勘
      this.props.nowRecordStore.getNowRecordListBanner({companyName});
    }
  }
  componentWillUnmount() {
    this.props.nowRecordStore.resetStore();
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
