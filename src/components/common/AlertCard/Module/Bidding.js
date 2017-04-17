import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class Bidding extends Component {
  static propTypes = {
    data: PropTypes.object,
    commonBoundAC: PropTypes.object,
    module: PropTypes.string,
    reducerData: PropTypes.object,
  };
  viewDetail = () => {
    let companyId = '';
    const actionId = Date.now();
    if (this.props.module === 'laneGraph') {
      if (this.props.data.get('relatedMonitorId')) {
        companyId = this.props.data.get('relatedMonitorId');
      } else {
        companyId = this.props.data.get('mainMonitorId');
      }
    } else {
      companyId = this.props.reducerData.info.monitorId;
    }
    const announceId = this.props.data.content.announceID;
    const getUrl = `/api/monitor/${companyId}/operation/bidding/detail?announceId=${announceId}`;
    this.props.commonBoundAC.getDetail(
      getUrl,
      ['bidMarkertDetailData', 'result'],
      'DETAILS_MODAL_UPDATE',
      this.props.data,
      actionId,
      this.props.data.content.url,
      './bidMarket/bidMarketTitle',
      './bidMarket/bidMarketContent',
      './bidMarket/bidMarketSource',
      'RISK_UPDATE_VALUE',
      ['events', 'loading', this.props.data.eventId]
    );
  }
  render() {
    const eventId = this.props.data.eventId;
    const data = {
      'hideConfig': [
        {'key': 'title', 'width': '12'},
      ],
      'viewConfig': [
        {'key': 'title', 'width': '12'},
        {'key': 'publishDate', 'width': '12'},
        {'key': 'participator', 'width': '12'},
      ],
      date: {
        label: '成交日期',
        value: this.props.data.content.date
      },
      'handleBlock': true,
      'actionToUrl': true,
      'dict': 'bidding',
      'items': this.props.data,
    };
    return (<BaseModule
              type="bidding"
              {...this.props}
              data={data}
              viewDetCallback={this.viewDetail}
              type="double"
              module={this.props.module}
              loading={this.props.reducerData.loading[eventId]}/>);
  }
}
