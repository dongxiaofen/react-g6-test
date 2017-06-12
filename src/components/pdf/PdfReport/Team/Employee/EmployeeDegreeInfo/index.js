import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function EmployeeDegreeInfo({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="招聘学历要求" />
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
    dict: 'degreeInfo',
    decimal: 'true'
  };
  return (
    <div>
      <SecondTitle module="招聘学历要求" />
      <PdfTable {...data}/>
    </div>
  );
}

EmployeeDegreeInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(EmployeeDegreeInfo);
