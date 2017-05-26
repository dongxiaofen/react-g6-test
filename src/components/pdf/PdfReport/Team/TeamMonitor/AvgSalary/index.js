import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function AvgSalary({moduleData}) {
  console.log(moduleData, '招聘平均薪资');
  if (!moduleData || Object.keys(moduleData).length < 1) {
    return (
      <div>
        <SecondTitle module="招聘平均薪资趋势" />
        <PdfNotFound />
      </div>
    );
  }
  const formatData = (data) => {
    const result = [];
    const Key = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        Key.push(key);
        if (data[key]) {
          result.push({
            time: key,
            salary: data[key]
          });
        }
      }
    }
    let data_ = result;
    data_ = data_.sort((prev, next) => {
      return new Date(prev.time) - new Date(next.time);
    });
    return result;
  };
  const data = {
    dataConfig: [
      {key: 'time', width: '5'},
      {key: 'salary', width: '5'},
    ],
    items: formatData(moduleData),
    dict: 'recruitSalaryAvg',
  };
  return (
    <div>
      <SecondTitle module="招聘平均薪资趋势" />
      <PdfTable {...data} />
    </div>
  );
}

AvgSalary.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(AvgSalary);
