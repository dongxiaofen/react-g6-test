import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {CardTable } from 'components/common/report';

function CourtExecution({courtExecution, regTime}) {
  const modifyCaseState = ()=> {
    return '--';
  };
  const data = {
    meta: {
      body: [
        {'key': 'pname', 'width': '6'},
        {'key': 'execCourtName', 'width': '6'},
        {'key': 'caseCreateTime', 'width': '6', modifyText: regTime},
        {'key': 'caseCode', 'width': '6'},
        {'key': 'execMoney', 'width': '6'},
        {'key': 'caseState', 'width': '6', modifyText: modifyCaseState},
      ],
      isExpand: false,
      dict: 'courtExecution',
      cData: courtExecution.data
    },
    module: '被执行人信息',
    error: courtExecution.data.length === 0
  };
  return (
    <CardTable {...data} />
  );
}

CourtExecution.propTypes = {
  courtExecution: PropTypes.object,
  regTime: PropTypes.func
};
export default observer(CourtExecution);
