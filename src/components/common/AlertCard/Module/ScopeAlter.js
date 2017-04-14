import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class ScopeAlter extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  formatBr = (value) => {
    if (value) {
      return value.replace(/<br>/g, '');
    }
    return value;
  }
  render() {
    const data = {
      'hideConfig': [
        {'key': 'altAf', 'width': '12', 'handle': this.formatBr, 'backgroundClass': 'ellipsis', 'needHtmlParse': true},
      ],
      'viewConfig': [
        {'key': 'altAf', 'width': '12', 'needHtmlParse': true},
        {'key': 'altBe', 'width': '12', 'needHtmlParse': true},
      ],
      date: {
        label: '变更日期',
        value: this.props.data.getIn(['content', 'altDate'])
      },
      'handleBlock': true,
      'ellipsis': true,
      'items': this.props.data,
      'dict': 'alterList'
    };
    return <BaseModule {...this.props} data={data} />;
  }
}
