import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function FYAnnouncement({data, module}) {
  const arrayToString = (arr)=>{
    let arr_ = arr;
    if (arr_) {
      arr_ = arr.join(',');
    }
    return arr_;
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'content', 'width': '12'}
    ],
    'viewConfig': [
      {'key': 'type', 'width': '6'},
      {'key': 'identity', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'relevantDepartments', 'width': '12', 'handle': arrayToString},
      {'key': 'content', 'width': '12'}
    ],
    date: {
      label: '公告日期',
      value: data.content.publishTime
    },
    'handleBlock': true,
    'dict': 'courtAnnouncement',
    'items': data,
  };
  return <BaseModule module={module} data={moduleData} />;
}
export default observer(FYAnnouncement);
