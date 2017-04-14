import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class Bidding extends Component {
  static propTypes = {
    data: PropTypes.object,
    commonBoundAC: PropTypes.object,
    module: PropTypes.string,
    reducerData: PropTypes.string,
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
      companyId = this.props.reducerData.getIn(['info', 'monitorId']);
    }
    const announceId = this.props.data.getIn(['content', 'announceID']);
    const getUrl = `/api/monitor/${companyId}/operation/bidding/detail?announceId=${announceId}`;
    this.props.commonBoundAC.getDetail(
      getUrl,
      ['bidMarkertDetailData', 'result'],
      'DETAILS_MODAL_UPDATE',
      this.props.data,
      actionId,
      this.props.data.getIn(['content', 'url']),
      './bidMarket/bidMarketTitle',
      './bidMarket/bidMarketContent',
      './bidMarket/bidMarketSource',
      'RISK_UPDATE_VALUE',
      ['events', 'loading', this.props.data.getIn(['eventId'])]
    );
  }
  render() {
    const eventId = this.props.data.getIn(['eventId']);
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
        value: this.props.data.getIn(['content', 'date'])
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
              module="double"
              loading={this.props.reducerData.getIn(['loading', eventId])}/>);
  }
}
