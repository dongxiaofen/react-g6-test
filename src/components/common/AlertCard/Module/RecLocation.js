import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
import JobCard from '../JobCard';
export default class RecLocation extends Component {
  static propTypes = {
    data: PropTypes.object,
  };
  modifyLocations = (data) => {
    return data.join(',');
  }
  createContent = ()=>{
    const data = {
      firstKey: 'address',
      config: ['position', 'salary', 'requireNum'],
      dict: 'recLocation',
      items: this.props.data.getIn(['content', 'recruitmentDataList'])
    };
    return <JobCard {...this.props} data={data} />;
  }
  render() {
    const data = {
      'hideConfig': [
        {'key': 'locations', 'width': '12', handle: this.modifyLocations},
      ],
      'viewConfig': [
        {'key': 'locations', 'width': '12', handle: this.modifyLocations},
      ],
      date: {
        label: '日期',
        value: this.props.data.getIn(['alterDt'])
      },
      'handleBlock': true,
      'dict': 'recLocation',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data} contentHtml={this.createContent}/>;
  }
}
