import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function ScopeAlter({data, module}) {
  const formatBr = (value) => {
    if (value) {
      return value.replace(/<br>/g, '');
    }
    return value;
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'altAf', 'width': '12', 'handle': formatBr},
    ],
    'viewConfig': [
      {'key': 'altAf', 'width': '12'},
      {'key': 'altBe', 'width': '12'},
    ],
    date: {
      label: '变更日期',
      value: data.content.altDate
    },
    'items': data,
    'dict': 'alterList',
    typeName: data.content.altItem,
  };
  return <BaseModule module={module} data={moduleData} hasSecondType= {false}/>;
}
export default observer(ScopeAlter);
