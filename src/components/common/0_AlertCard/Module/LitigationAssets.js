import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function LitigationAssets({data, module}) {
  const moduleData = {
    'hideConfig': [
      {'key': 'title', 'width': '12'}
    ],
    'viewConfig': [
      {'key': 'title', 'width': '12'},
      {'key': 'category', 'width': '6'},
      {'key': 'status', 'width': '6'},
      {'key': 'court', 'width': '12'},
      {'key': 'projectNotice', 'width': '12'},
    ],
    date: {
      label: '公告日期',
      value: data.content.releaseTime
    },
    'items': data,
    'handleBlock': true,
    'dict': 'courtLitigation',
    typeName: `参考价（${data.content.price}万元）`
  };
  return <BaseModule data={moduleData} module={module}/>;
}
export default observer(LitigationAssets);
