import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class CheckInfo extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  render() {
    const data = {
      'hideConfig': [
        {'key': 'institution', 'width': '6'},
      ],
      'viewConfig': [
        {'key': 'institution', 'width': '6'},
        {'key': 'checkType', 'width': '6'},
        {'key': 'checkResult', 'width': '12'}
      ],
      date: {
        label: '日期',
        value: this.props.data.content.checkDate
      },
      'dict': 'checkMessageList',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data}/>;
  }
}
