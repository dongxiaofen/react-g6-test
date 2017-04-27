import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {CardTable } from 'components/common/report';

function DishonestyList({dishonestyList, regTime}) {
  const data = {
    meta: {
      body: [
        {'key': 'title', 'width': '12'},
        {'key': 'releaseTime', 'width': '6', 'modifyText': regTime},
        {'key': 'price', 'width': '6'},
        {'key': 'category', 'width': '6', hide: 'true'},
        {'key': 'status', 'width': '6', hide: 'true'},
        {'key': 'court', 'width': '12', hide: 'true'},
        {'key': 'projectNotice', 'width': '12', hide: 'true'}
      ],
      isExpand: false,
      dict: 'dishonestyList',
      cData: dishonestyList.data
    },
    module: '被执行人信息',
    error: dishonestyList.data.length === 0
  };
  return (
    <CardTable {...data} />
  );
}

DishonestyList.propTypes = {
  foo: PropTypes.string,
};
export default observer(DishonestyList);
