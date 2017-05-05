import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfTable from 'components/common/pdf/PdfTable';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function BlackNetWork({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="风险关联信息" />
        <PdfNotFound />
      </div>
    );
  }
  const formatData = (data) => {
    const result = [];
    data.forEach(item => {
      const obj = {
        companyName: item.blackListNode,
        layer: item.level,
        riskRecord: item.disruptTypeList.length,
      };
      result.push(obj);
    });
    return result;
  };
  const data = {
    dataConfig: [
      {key: 'companyName', width: '6'},
      {key: 'layer', width: '2'},
      {key: 'riskRecord', width: '2'},
    ],
    items: formatData(moduleData),
    dict: 'blackList',
  };
  return (
    <div>
      <SecondTitle module="风险关联信息" />
      <PdfTable {...data} />
    </div>
  );
}

BlackNetWork.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(BlackNetWork);
