import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class FYAnnouncement extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  regTime(value) {
    let time;
    if (value) {
      time = value.slice(0, 10);
    } else {
      time = value;
    }
    return time;
  }
  listMapToStr(value) {
    let str = '';
    if (typeof(value) !== 'object') {
      return value;
    }
    value.map((item) => {
      str += ' ' + item;
    });
    return str;
  }
  arrayToString(arr) {
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
        {'key': 'type', 'width': '6'},
        {'key': 'identity', 'width': '6'},
        {'key': 'court', 'width': '6'},
        // {'key': 'judgeTime', 'width': '6', 'handle': this.regTime},
        {'key': 'relevantDepartments', 'width': '12', 'handle': this.arrayToString},
        {'key': 'content', 'width': '12'}
      ],
      date: {
        label: '公告日期',
        value: this.props.data.getIn(['content', 'publishTime'])
      },
      'handleBlock': true,
      'dict': 'courtAnnouncement',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data} />;
  }
}
