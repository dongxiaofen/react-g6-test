import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
export default class Patent extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  getValue(value) {
    if (value) {
      return value.cname;
    }
  }
  getValue_(value) {
    if (value) {
      return value.number;
    }
  }
  render() {
    const data = {
      'hideConfig': [
        {'key': 'title', 'width': '6'},
      ],
      'viewConfig': [
        {'key': 'title', 'width': '6'},
        {'key': 'classificationNumbercname', 'width': '6', 'handle': this.getValue},
        {'key': 'applyDate', 'width': '6'},
        {'key': 'applyNum', 'width': '6'},
        {'key': 'classificationNumber', 'width': '6', 'handle': this.getValue_},
        {'key': 'authPubNum', 'width': '6'},
        {'key': 'inventionPerson', 'width': '6'},
        {'key': 'type', 'width': '6'},
        {'key': 'description', 'width': '12'},
      ],
      date: {
        label: '授权日期',
        value: this.props.data.content.authPubDate
      },
      'handleBlock': true,
      'dict': 'Patent',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data} />;
  }
}
