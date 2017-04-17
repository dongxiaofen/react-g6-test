import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class LitigationAssets extends Component {
  static propTypes = {
    data: PropTypes.object,
    riskheadlinesBoundAC: PropTypes.object,
  };
  render() {
    const data = {
      'hideConfig': [
        {'key': 'title', 'width': '12'}
      ],
      'viewConfig': [
        {'key': 'title', 'width': '12'},
        {'key': 'category', 'width': '6'},
        {'key': 'status', 'width': '6'},
        {'key': 'court', 'width': '12'},
        {'key': 'projectNotice', 'width': '12'},
      ],
      date: {
        label: '公告日期',
        value: this.props.data.content.releaseTime
      },
      'items': this.props.data,
      'handleBlock': true,
      'dict': 'litigationAssets',
      typeName: `参考价（${this.props.data.content.price}万元）`
    };
    return <BaseModule {...this.props} data={data} />;
  }
}
