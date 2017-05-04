import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfTable from 'components/common/pdf/PdfTable';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function ShareAlter({moduleData}) {
  if (moduleData === undefined || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="股权变更信息"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'shareholderName', 'width': '2.5'},
      {'key': 'equityBefore', 'width': '2.5'},
      {'key': 'equityAfter', 'width': '2.5'},
      {'key': 'time', 'width': '2.5'},
    ],
    items: moduleData,
    dict: 'yearEquityChange',
  };
  return (
    <div>
      <SecondTitle module="股权变更信息" />
      <PdfTable {...data} />
    </div>
  );
}

ShareAlter.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(ShareAlter);
