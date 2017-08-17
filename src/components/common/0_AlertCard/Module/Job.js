import React from 'react';
import BaseModule from '../BaseModule';
import JobCard from './JobCard';
import {observer} from 'mobx-react';
function Job({data, module}) {
  const modifyPost = (value) => {
    return value.join('，');
  };
  const createContent = ()=>{
    const teamData = {
      firstKey: 'position',
      config: ['salary', 'requireNum'],
      dict: 'job',
      items: data.content.recruitmentDataList
    };
    return <JobCard data={teamData} />;
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'posts', 'width': '12', handle: modifyPost},
    ],
    'viewConfig': [
      {'key': 'posts', 'width': '12', handle: modifyPost},
    ],
    date: {
      label: '日期',
      value: data.alterDt
    },
    'handleBlock': true,
    'dict': 'job',
    'items': data,
  };
  return <BaseModule module={module} data={moduleData} contentHtml={createContent}/>;
}
export default observer(Job);
