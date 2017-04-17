import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class KTAnnouncement extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  arrayToString(arr) {
    console.log(arr);
    let arr_ = arr;
    if (arr_) {
      arr_ = arr.join(',');
    }
    return arr_;
  }
  render() {
    const data = {
      'hideConfig': [
        {'key': 'content', 'width': '12'}
      ],
      'viewConfig': [
        {'key': 'court', 'width': '6'},
        {'key': 'identity', 'width': '6'},
        // {'key': 'areaName', 'width': '6'},
        {'key': 'relevantDepartments', 'width': '12', 'handle': this.arrayToString},
        {'key': 'content', 'width': '12'}
      ],
      date: {
        label: '开庭日期',
        value: this.props.data.content.judgeTime
      },
      'handleBlock': true,
      'dict': 'courtNotice',
      'items': this.props.data,
      typeName: this.props.data.content.caseReason || ''
    };
    return <BaseModule {...this.props} data={data} />;
  }
}
