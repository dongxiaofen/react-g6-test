import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
import JobCard from './JobCard';
export default class Job extends Component {
  static propTypes = {
    data: PropTypes.object
  };
  modifyPost = (data) => {
    return data.join('，');
  }
  createContent = ()=>{
    const data = {
      firstKey: 'position',
      config: ['salary', 'requireNum'],
      dict: 'job',
      items: this.props.data.content.recruitmentDataList
    };
    return <JobCard {...this.props} data={data} />;
  }
  render() {
    const data = {
      'hideConfig': [
        {'key': 'posts', 'width': '12', handle: this.modifyPost},
      ],
      'viewConfig': [
        {'key': 'posts', 'width': '12', handle: this.modifyPost},
      ],
      date: {
        label: '日期',
        value: this.props.data.alterDt
      },
      'handleBlock': true,
      'dict': 'job',
      'items': this.props.data,
    };
    return <BaseModule {...this.props} data={data} contentHtml={this.createContent}/>;
  }
}
