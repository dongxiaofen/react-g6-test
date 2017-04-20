import React from 'react';
import BaseModule from '../BaseModule';
import JobCard from './JobCard';
import {observer} from 'mobx-react';
function RecLocation({data, module}) {
  const modifyLocations = (value) => {
    return value.join(',');
  };
  const createContent = ()=>{
    const teamData = {
      firstKey: 'address',
      config: ['position', 'salary', 'requireNum'],
      dict: 'recLocation',
      items: data.content.recruitmentDataList
    };
    return <JobCard data={teamData} />;
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'locations', 'width': '12', handle: modifyLocations},
    ],
    'viewConfig': [
      {'key': 'locations', 'width': '12', handle: modifyLocations},
    ],
    date: {
      label: '日期',
      value: data.alterDt
    },
    'handleBlock': true,
    'dict': 'recLocation',
    'items': data,
  };
  return <BaseModule module={module} data={moduleData} contentHtml={createContent}/>;
}
export default observer(RecLocation);
