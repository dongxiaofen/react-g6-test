import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function EmployeeList({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="近期招聘岗位" />
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {key: 'category', width: '2'},
      {key: 'salaryText', width: '2'},
      {key: 'address', width: '2'},
      {key: 'requireNum', width: '2'},
      {key: 'releaseTime', width: '2'},
    ],
    items: moduleData,
    dict: 'category',
  };
  return (
    <div>
      <SecondTitle module="近期招聘岗位" />
      <PdfTable {...data} />
    </div>
  );
}

EmployeeList.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(EmployeeList);
