import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function KTAnnouncement({data, module}) {
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
      {'key': 'detail', 'width': '12'}
    ],
    'viewConfig': [
      {'key': 'court', 'width': '6'},
      {'key': 'identity', 'width': '6'},
      // {'key': 'areaName', 'width': '6'},
      {'key': 'litigant', 'width': '12', 'handle': arrayToString},
      {'key': 'detail', 'width': '12'}
    ],
    date: {
      label: '开庭日期',
      value: data.content.judgeTime
    },
    'handleBlock': true,
    'dict': 'courtNotice',
    'items': data,
    typeName: data.content.caseReason || ''
  };
  return <BaseModule module={module} data={moduleData} />;
}
export default observer(KTAnnouncement);
