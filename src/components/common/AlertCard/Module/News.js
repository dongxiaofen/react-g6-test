import React, {Component, PropTypes} from 'react';
import { dealWithDate } from '../../../../helpers/common';
// import styles from './news.less';
import BaseModule from '../BaseModule';
export default class News extends Component {
  static propTypes = {
    data: PropTypes.object,
    commonBoundAC: PropTypes.object,
    module: PropTypes.string,
    reducerData: PropTypes.object,
  };
  constructor(props) {
    super(props);
  }
  viewDetail = () => {
    this.actionId = Date.now();
    let url = this.props.data.content.url;
    if (!url) {
      url = dealWithDate(this.props.data.content.title);
    }
    let companyId = '';
    if (this.props.module === 'laneGraph') {
      if (this.props.data.relatedMonitorId) {
        companyId = this.props.data.relatedMonitorId;
      } else {
        companyId = this.props.data.mainMonitorId;
      }
    } else {
      companyId = this.props.reducerData.info.monitorId;
    }

    const createdAt = this.props.data.content.createdAt;
    const enUrl = encodeURIComponent(url);
    const getUrl = `/api/monitor/${companyId}/internet/detail?createdAt=${createdAt}&url=${enUrl}`;
    this.props.commonBoundAC.getDetail(
      getUrl, ['newsData', 'data'],
      'DETAILS_MODAL_UPDATE',
      this.props.data,
      this.actionId,
      url,
      './news/newsTitle',
      './news/newsContent',
      './news/newsSource',
      'RISK_UPDATE_VALUE',
      ['events', 'loading', this.props.data.eventId]
    );
  }
  render() {
    const data = {
      'hideConfig': [
        {'key': 'title', 'width': '12'},
      ],
      'viewConfig': [
        {'key': 'title', 'width': '12'},
      ],
      date: {
        label: '发布日期',
        value: this.props.data.content.date
      },
      'handleBlock': true,
      'actionToUrl': true,
      'dict': 'news',
      'items': this.props.data,
      typeName: this.props.data.dimensionGroup ? this.props.data.dimensionGroup.split(',')[0] : ''
    };
    return (
      <BaseModule
        data={data}
        btnText="查看"
        type="detail"
        viewDetCallback={this.viewDetail}
        loading={this.props.reducerData.loading.eventId}
        hasSecondType= {false}/>
    );
  }
}
