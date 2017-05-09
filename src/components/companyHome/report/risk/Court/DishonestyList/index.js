import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {CardTable } from 'components/common/report';

function DishonestyList({dishonestyList, regTime}) {
  const data = {
    meta: {
      body: [
        {'key': 'caseCode', 'width': '6'},
        {'key': 'gistId', 'width': '6'},
        {'key': 'courtName', 'width': '6'},
        {'key': 'gistUnit', 'width': '6'},
        {'key': 'regDate', 'width': '6', 'modifyText': regTime},
        {'key': 'publishDate', 'width': '6', 'modifyText': regTime},
        {'key': 'disruptTypeName', 'width': '6'},
        {'key': 'performance', 'width': '6'},
        {'key': 'duty', 'width': '12', hide: true},
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
