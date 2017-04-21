import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function ErrorInfo({data, module}) {
  const moduleData = {
    'hideConfig': [
      {'key': 'specause', 'width': '12'}
    ],
    'viewConfig': [
      {'key': 'abntime', 'width': '6'},
      {'key': 'retime', 'width': '6'},
      {'key': 'recause', 'width': '6'},
      {'key': 'decorg', 'width': '6'},
      {'key': 'specause', 'width': '12'}
    ],
    date: {
      label: '列入日期',
      value: data.content.abntime
    },
    'dict': 'jyErrorData',
    'items': data,
  };
  return <BaseModule module={module} data={moduleData} />;
}
export default observer(ErrorInfo);
