import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function ExcuteInfo({data, module}) {
  const modifyCaseState = (value)=>{
    return value === '0' ? '无' : value;
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'execMoney', 'width': '6'},
    ],
    'viewConfig': [
      {'key': 'pname', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'execCourtName', 'width': '6'},
      {'key': 'caseState', 'width': '6', handle: modifyCaseState},
      {'key': 'execMoney', 'width': '6'}
    ],
    date: {
      label: '立案日期',
      value: data.content.caseCreateTime
    },
    'dict': 'courtExecution',
    'items': data,
  };
  return <BaseModule module={module} data={moduleData} />;
}
export default observer(ExcuteInfo);
