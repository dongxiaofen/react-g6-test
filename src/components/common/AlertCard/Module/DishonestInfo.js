import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function DishonestInfo({data, module}) {
  const regTime = (value)=>{
    let time;
    if (value) {
      time = value.slice(0, 10);
    } else {
      time = value;
    }
    return time;
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'disruptTypeName', 'width': '12'},
    ],
    'viewConfig': [
      {'key': 'publishDate', 'width': '6', 'handle': regTime},
      {'key': 'performance', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'gistId', 'width': '6'},
      {'key': 'courtName', 'width': '6'},
      {'key': 'gistUnit', 'width': '6'},
      {'key': 'disruptTypeName', 'width': '6'},
      {'key': 'duty', 'width': '12'}
    ],
    date: {
      label: '立案日期',
      value: data.content.regDate
    },
    'handleBlock': true,
    'dict': 'dishonestyList',
    'items': data,
  };
  return <BaseModule module={module} data={moduleData} />;
}
export default observer(DishonestInfo);
