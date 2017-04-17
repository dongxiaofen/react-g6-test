import React, {Component, PropTypes} from 'react';
import { dealWithDate } from '../../../../helpers/common';
import BaseModule from '../BaseModule';
export default class Stock extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  viewFunc = () => {
    this.setState({
      show: !this.state.show,
    });
  }
  viewDetail =()=> {
    let url = this.props.data.getIn(['content', 'baodaUrl']);
    if (!url) {
      url = dealWithDate(this.props.data.getIn(['content', 'title']));
    }
    window.open(url);
  }
  render() {
    const data = {
      'hideConfig': [
        {'key': 'title', 'width': '12'},
      ],
      'viewConfig': [
        {'key': 'title', 'width': '12'},
      ],
      date: {
        label: '公告日期',
        value: this.props.data.getIn(['content', 'announcementTime'])
      },
      'handleBlock': true,
      'actionToUrl': true,
      'dict': 'stock',
      'items': this.props.data,
    };
    return (
      <BaseModule type="stock" {...this.props} type="detail" data={data} btnText="查看" viewDetCallback={this.viewDetail}/>
    );
  }
}
