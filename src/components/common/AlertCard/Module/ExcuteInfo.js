import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class ExcuteInfo extends Component {
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
  modifyCaseState = (value)=>{
    return value === '0' ? '无' : value;
  }
  render() {
    const data = {
      'hideConfig': [
        {'key': 'execMoney', 'width': '6'},
      ],
      'viewConfig': [
        {'key': 'pname', 'width': '6'},
        {'key': 'caseCode', 'width': '6'},
        {'key': 'execCourtName', 'width': '6'},
        {'key': 'caseState', 'width': '6', handle: this.modifyCaseState},
        {'key': 'execMoney', 'width': '6'}
      ],
      date: {
        label: '立案日期',
        value: this.props.data.getIn(['content', 'caseCreateTime'])
      },
      'dict': 'courtExecution',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data} />;
  }
}
