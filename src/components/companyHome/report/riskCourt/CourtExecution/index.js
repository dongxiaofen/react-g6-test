import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {CardTable } from 'components/common/report';

function CourtExecution({courtExecution, regTime, loading}) {
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
      dict: 'courtExecuted',
      cData: courtExecution.content
    },
    isLoading: loading,
    module: '被执行人信息',
    error: !courtExecution.content || courtExecution.content.length === 0
  };
  return (
    <CardTable {...data} />
  );
}

CourtExecution.propTypes = {
  loading: PropTypes.bool,
  courtExecution: PropTypes.object,
  regTime: PropTypes.func
};
export default observer(CourtExecution);
