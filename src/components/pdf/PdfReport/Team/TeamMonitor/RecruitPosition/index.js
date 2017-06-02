import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function RecruitPosition({moduleData}) {
  if (!moduleData || Object.keys(moduleData).length < 1) {
    return (
      <div>
        <SecondTitle module="新增招聘岗位" />
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
        if (data[key].category.length > 0) {
          result.push({
            time: key,
            position: data[key].category.join(',')
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
      {key: 'position', width: '5'},
    ],
    items: formatData(moduleData),
    dict: 'recruitPosition',
  };
  return (
    <div>
      <SecondTitle module="新增招聘岗位" number={moduleData.size} />
      <PdfTable {...data} />
    </div>
  );
}

RecruitPosition.propTypes = {
  foo: PropTypes.string,
};
export default observer(RecruitPosition);
