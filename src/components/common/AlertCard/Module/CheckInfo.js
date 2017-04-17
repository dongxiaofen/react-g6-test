import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
// 工商－工商检查
function CheckInfo({data, module}) {
  const moduleData = {
    'hideConfig': [
      {'key': 'institution', 'width': '6'},
    ],
    'viewConfig': [
      {'key': 'institution', 'width': '6'},
      {'key': 'checkType', 'width': '6'},
      {'key': 'checkResult', 'width': '12'}
    ],
    date: {
      label: '日期',
      value: data.content.checkDate
    },
    'dict': 'checkMessageList',
    'items': data,
  };
  return <BaseModule data={moduleData} module={module}/>;
}
export default observer(CheckInfo);
