import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfTable from 'components/common/pdf/PdfTable';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function ShareHolder({ moduleData }) {
  if (moduleData === null || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="股东信息"/>
        <PdfNotFound />
      </div>
    );
  }
  const formData = (data) => {
    let newArr = [];
    data.map( (item) => {
      if (item.subConam) {
        item.subConam = parseFloat(item.subConam).toFixed(2);
      }
      if (item.relConam) {
        item.relConam = parseFloat(item.relConam).toFixed(2);
      }
      newArr = [...newArr, item];
    });
    return newArr;
  };
  const getUnit = (value, items) => {
    if (value && value !== '无') {
      if (items.regCapCur !== '') {
        return `${value}万（${items.regCapCur}）`;
      }
      return `${value}万元`;
    }
    return value;
  };
  const data = {
    dataConfig: [
      {'key': 'shareholderName', 'width': '2'},
      // {'key': 'shareholderType', 'width': '2'},
      {'key': 'subConam', 'width': '2', 'handle': getUnit},
      {'key': 'relConam', 'width': '2', 'handle': getUnit},
      {'key': 'fundedRatio', 'width': '2'},
      {'key': 'conDate', 'width': '2'},
    ],
    items: formData(moduleData),
    dict: 'shareholder',
  };
  return (
    <div>
      <SecondTitle module="股东信息" />
      <PdfTable {...data} />
    </div>
  );
}

ShareHolder.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(ShareHolder);
