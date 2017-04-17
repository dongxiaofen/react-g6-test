import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class ErrorInfo extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  render() {
    const data = {
      'hideConfig': [
        {'key': 'specause', 'width': '12'}
      ],
      'viewConfig': [
        {'key': 'abntime', 'width': '6'},
        {'key': 'retime', 'width': '6'},
        {'key': 'recause', 'width': '6'},
        {'key': 'decorg', 'width': '6'},
        {'key': 'specause', 'width': '12'}
      ],
      date: {
        label: '列入日期',
        value: this.props.data.content.abntime
      },
      'handleBlock': true,
      'dict': 'jyErrorData',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data} />;
  }
}
