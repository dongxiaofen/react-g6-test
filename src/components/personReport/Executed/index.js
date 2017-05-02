import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';

function Executed({executedData, isLoading}) {
  const data = {
    meta: {
      body: [
        { 'key': 'caseNO', 'width': '3' },
        { 'key': 'court', 'width': '3' },
        { 'key': 'executionTarget', 'width': '3' },
        { 'key': 'recordTime', 'width': '3' },
      ],
      tData: executedData,
      dict: 'executed',
    },
    isLoading: isLoading,
    module: '老赖记录',
    error: executedData === undefined
  };
  return (
    <div>
      <ModuleTitle module={`被执行人信息（${executedData ? executedData.length : 0}）`} />
      <CommonTable {...data} />
    </div>
  );
}

Executed.propTypes = {
  foo: PropTypes.string,
};
export default observer(Executed);
