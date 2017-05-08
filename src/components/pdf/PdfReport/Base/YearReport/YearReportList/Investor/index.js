import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfTable from 'components/common/pdf/PdfTable';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function Investor({moduleData}) {
  if (moduleData === undefined || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="股东及出资信息"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'shareholderName', 'width': '1.6'},
      {'key': 'subConam', 'width': '1.6'},
      {'key': 'subConDate', 'width': '1.4'},
      {'key': 'subConType', 'width': '1.2'},
      {'key': 'paidConMoney', 'width': '1.6'},
      {'key': 'paidTime', 'width': '1.4'},
      {'key': 'paidType', 'width': '1.2'},
    ],
    items: moduleData,
    dict: 'yearInvestor',
    decimal: true,
  };
  return (
    <div>
      <SecondTitle module="股东及出资信息" />
      <PdfTable {...data} />
    </div>
  );
}

Investor.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(Investor);
