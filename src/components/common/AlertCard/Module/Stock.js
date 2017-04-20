import React from 'react';
import { dealWithDate } from '../../../../helpers/common';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
function Stock({data, module}) {
  const viewDetail = ()=> {
    let url = data.getIn(['content', 'baodaUrl']);
    if (!url) {
      url = dealWithDate(data.getIn(['content', 'title']));
    }
    window.open(url);
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'title', 'width': '12'},
    ],
    'viewConfig': [
      {'key': 'title', 'width': '12'},
    ],
    date: {
      label: '公告日期',
      value: data.getIn(['content', 'announcementTime'])
    },
    'handleBlock': true,
    'actionToUrl': true,
    'dict': 'stock',
    'items': data,
  };
  return (
    <BaseModule
      module={module}
      type="detail"
      data={moduleData}
      btnText="查看"
      viewDetCallback={viewDetail}/>
  );
}
export default observer(Stock);
