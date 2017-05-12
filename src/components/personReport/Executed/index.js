import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
import moment from 'moment';

function Executed({executedData, isLoading}) {
  const convertingTime = () => {
    let newArr = [];
    if (executedData) {
      executedData.forEach((item) => {
        if (item.recordTime) {
          item.recordTime = moment(item.recordTime).format('YYYY-MM-DD');
          newArr = [...newArr, item];
        }
      });
    }
    return newArr;
  };
  const data = {
    meta: {
      body: [
        { 'key': 'caseNO', 'width': '3' },
        { 'key': 'court', 'width': '3' },
        { 'key': 'executionTarget', 'width': '3' },
        { 'key': 'recordTime', 'width': '3' },
      ],
      tData: convertingTime(),
      dict: 'executed',
    },
    isLoading: isLoading,
    module: '被执行人信息',
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
