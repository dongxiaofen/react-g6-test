import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class DishonestInfo extends Component {
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
  render() {
    const data = {
      'hideConfig': [
        {'key': 'disruptTypeName', 'width': '12'},
      ],
      'viewConfig': [
        {'key': 'publishDate', 'width': '6', 'handle': this.regTime},
        {'key': 'performance', 'width': '6'},
        {'key': 'caseCode', 'width': '6'},
        {'key': 'gistId', 'width': '6'},
        {'key': 'courtName', 'width': '6'},
        {'key': 'gistUnit', 'width': '6'},
        {'key': 'disruptTypeName', 'width': '6'},
        {'key': 'duty', 'width': '12'}
      ],
      date: {
        label: '立案日期',
        value: this.props.data.content.regDate
      },
      'handleBlock': true,
      'dict': 'dishonestyList',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data} />;
  }
}
