import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
function Management({ management, isLoading }) {
  const data = {
    meta: {
      body: [
        { 'key': 'name', 'width': '2' },
        { 'key': 'position', 'width': '2' },
        { 'key': 'birth_year', 'width': '2' },
        { 'key': 'gender', 'width': '2' },
        { 'key': 'degree', 'width': '2' },
      ],
      tData: management,
      dict: 'stockManagement',
    },
    isLoading: isLoading,
    module: '十大股东',
    error: management.length === 0
  };
  return (
    <div>
      <ModuleTitle module="高管" />
      <CommonTable {...data} />
    </div>
  );
}

Management.propTypes = {
  management: PropTypes.object,
  isLoading: PropTypes.bool,
};
export default observer(Management);
