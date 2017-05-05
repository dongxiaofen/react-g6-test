import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function EmployeeMessage({ moduleData }) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="招聘信息－招聘岗位分布" />
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {key: 'name', width: '5'},
      {key: 'value', width: '5'},
    ],
    items: moduleData.toJS(),
    dict: 'categoryInfo',
    decimal: 'true'
  };
  return (
    <div>
      <SecondTitle module="招聘信息－招聘岗位分布" />
      <PdfTable {...data} />
    </div>
  );
}

EmployeeMessage.propTypes = {
  moduleData: PropTypes.array,
};
export default observer(EmployeeMessage);
