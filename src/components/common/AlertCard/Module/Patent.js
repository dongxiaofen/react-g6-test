import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function Patent({data, module}) {
  const getValue = (value)=>{
    if (value) {
      return value.cname;
    }
  };
  const getValue_ = (value)=>{
    if (value) {
      return value.number;
    }
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'title', 'width': '6'},
    ],
    'viewConfig': [
      {'key': 'title', 'width': '6'},
      {'key': 'classificationNumbercname', 'width': '6', 'handle': getValue},
      {'key': 'applyDate', 'width': '6'},
      {'key': 'applyNum', 'width': '6'},
      {'key': 'classificationNumber', 'width': '6', 'handle': getValue_},
      {'key': 'authPubNum', 'width': '6'},
      {'key': 'inventionPerson', 'width': '6'},
      {'key': 'type', 'width': '6'},
      {'key': 'description', 'width': '12'},
    ],
    date: {
      label: '授权日期',
      value: data.content.authPubDate
    },
    'handleBlock': true,
    'dict': 'Patent',
    'items': data,
  };
  return <BaseModule data={moduleData} module={module}/>;
}
export default observer(Patent);
