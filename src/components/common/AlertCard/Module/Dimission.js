import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class Dimission extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  modifyDim = (data) => {
    const newData = data.toJS().map((item)=>{
      return item.value ? `${item.name}（${item.value}人）` : `${item.value}人`;
    });
    return newData.join(';');
  }
  render() {
    const data = {
      'hideConfig': [
        {'key': 'dimissions', 'width': '12', handle: this.modifyDim},
      ],
      'viewConfig': [
        {'key': 'dimissions', 'width': '12', handle: this.modifyDim},
      ],
      date: {
        label: '日期',
        value: this.props.data.alterDt
      },
      'handleBlock': true,
      'dict': 'dimissions',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data} type="none"/>;
  }
}
