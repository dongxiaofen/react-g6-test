import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function EmployeeCategoryTypeInfo({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="所学专业" />
        <PdfNotFound />
      </div>
    );
  }
  const dataList = moduleData;
  // 冒泡排序
  for (let item = 0; item < dataList.length - 1; item++) {
    for (let item2 = 0; item2 < dataList.length - 1 - item; item2++) {
      if (dataList[item2].value > dataList[item2 + 1].value) {
        const tmp = dataList[item2];
        dataList[item2] = dataList[item2 + 1];
        dataList[item2 + 1] = tmp;
      }
    }
  }

  const data = {
    dataConfig: [
      {key: 'name', width: '5'},
      {key: 'value', width: '5'},
    ],
    items: dataList.reverse(),
    dict: 'categoryTypeInfo',
    decimal: 'true'
  };
  return (
    <div>
      <SecondTitle module="所学专业" />
      <PdfTable {...data} />
    </div>
  );
}

EmployeeCategoryTypeInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(EmployeeCategoryTypeInfo);
