import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class TradeMark extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  render() {
    const data = {
      'hideConfig': [
        {'key': 'name', 'width': '6'},
        {'key': 'flowStatus', 'width': '6'},
      ],
      'viewConfig': [
        {'key': 'name', 'width': '6'},
        {'key': 'flowStatus', 'width': '6'},
        {'key': 'base64', 'width': '6', 'needBase64Parse': true},
        {'key': 'category', 'width': '6'}
      ],
      date: {
        label: '更新日期',
        value: this.props.data.getIn(['alterDt'])
      },
      'handleBlock': true,
      'dict': 'TradeMark',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data} />;
  }
}
