import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function AvgSalary({moduleData}) {
  const formatData = (data) => {
    const result = [];
    const Key = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        Key.push(key);
        result.push({
          time: key,
          salary: data[key] ? data[key].toFixed(2) : '/'
        });
      }
    }
    let data_ = result;
    data_ = data_.sort((prev, next) => {
      return new Date(prev.time) - new Date(next.time);
    });
    return result;
  };
  if (!moduleData) {
    return (
      <div>
        <SecondTitle module="招聘平均薪资趋势" />
        <PdfNotFound />
      </div>
    );
  }
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
