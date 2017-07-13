import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function FYAnnouncement({data, module}) {
  const arrayToString = (arr)=>{
    const output = [];
    if (arr) {
      arr.forEach((item)=>{
        output.push(item.litigantName);
      });
    }
    return output.join('；');
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'content', 'width': '12'}
    ],
    'viewConfig': [
      {'key': 'docType', 'width': '6'},
      {'key': 'identity', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', 'handle': arrayToString},
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
