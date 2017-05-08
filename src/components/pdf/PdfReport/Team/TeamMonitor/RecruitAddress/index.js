import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function RecruitAddress({moduleData}) {
  if (!moduleData) {
    return (
      <div>
        <SecondTitle module="新增招聘地点" />
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
        result.push({
          time: key,
          address: data[key].location.length > 0 ? data[key].location.join(',') : '/'
        });
      }
    }
    let data_ = result;
    data_ = data_.sort((prev, next) => {
      return new Date(prev.time) - new Date(next.time);
    });
    return result;
  };
  // formatData(moduleData);
  const data = {
    dataConfig: [
      {key: 'time', width: '5'},
      {key: 'address', width: '5'},
    ],
    items: formatData(moduleData),
    dict: 'recruitAddress',
  };
  return (
    <div>
      <SecondTitle module="新增招聘地点" />
      <PdfTable {...this.props} {...data} />
    </div>
  );
}

RecruitAddress.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(RecruitAddress);
