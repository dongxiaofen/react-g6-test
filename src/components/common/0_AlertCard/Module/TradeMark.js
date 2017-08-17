import React from 'react';
import BaseModule from '../BaseModule';
import noImg from 'imgs/riskHeadlines/noimg.jpg';
import {observer} from 'mobx-react';
function TradeMark({data, module}) {
  const modifyImg = (value)=>{
    return <img src={value ? 'data:image/jpeg;base64,' + value : noImg} style={{width: '100px'}} />;
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'name', 'width': '6'},
      {'key': 'flowStatus', 'width': '6'},
    ],
    'viewConfig': [
      {'key': 'name', 'width': '6'},
      {'key': 'flowStatus', 'width': '6'},
      {'key': 'base64', 'width': '6', handle: modifyImg},
      {'key': 'category', 'width': '6'}
    ],
    date: {
      label: '更新日期',
      value: data.alterDt
    },
    'handleBlock': true,
    'dict': 'TradeMark',
    'items': data,
  };
  return <BaseModule data={moduleData} module={module}/>;
}
export default observer(TradeMark);
