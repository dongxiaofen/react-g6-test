import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
import noImg from 'imgs/riskHeadlines/noimg.jpg';
export default class TradeMark extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  modifyImg(value) {
    return <img src={value ? 'data:image/jpeg;base64,' + value : noImg} style={{width: '100px'}} />;
  }
  render() {
    const data = {
      'hideConfig': [
        {'key': 'name', 'width': '6'},
        {'key': 'flowStatus', 'width': '6'},
      ],
      'viewConfig': [
        {'key': 'name', 'width': '6'},
        {'key': 'flowStatus', 'width': '6'},
        {'key': 'base64', 'width': '6', handle: this.modifyImg},
        {'key': 'category', 'width': '6'}
      ],
      date: {
        label: '更新日期',
        value: this.props.data.alterDt
      },
      'handleBlock': true,
      'dict': 'TradeMark',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data} />;
  }
}
