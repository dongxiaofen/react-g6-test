import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function Dimission({data, module}) {
  const modifyDim = (value) => {
    const newData = value.toJS().map((item)=>{
      return item.value ? `${item.name}（${item.value}人）` : `${item.value}人`;
    });
    return newData.join(';');
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'dimissions', 'width': '12', handle: modifyDim},
    ],
    'viewConfig': [
      {'key': 'dimissions', 'width': '12', handle: modifyDim},
    ],
    date: {
      label: '日期',
      value: data.alterDt
    },
    'handleBlock': true,
    'dict': 'dimissions',
    'items': data,
  };
  return <BaseModule module={module} data={moduleData} type="none"/>;
}
export default observer(Dimission);
