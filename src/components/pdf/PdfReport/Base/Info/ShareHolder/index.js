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
      newArr = [...newArr, item];
    });
    return newArr;
  };
  const data = {
    dataConfig: [
      {'key': 'shareholderName', 'width': '2'},
      {'key': 'shareholderType', 'width': '2'},
      {'key': 'subConam', 'width': '2'},
      {'key': 'relConam', 'width': '1.2'},
      {'key': 'fundedRatio', 'width': '1.4'},
      {'key': 'conDate', 'width': '1.4'},
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
