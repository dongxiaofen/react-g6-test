import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';
import PdfTable from 'components/common/pdf/PdfTable';

function FiliationList({ moduleData }) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="分支机构"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'brName', 'width': '2'},
      {'key': 'brRegno', 'width': '1'},
      {'key': 'belong_org', 'width': '2'},
      {'key': 'brPrincipal', 'width': '1'},
      // {'key': 'cbuItem', 'width': '2'},
      {'key': 'brAddr', 'width': '2'},
    ],
    items: moduleData,
    dict: 'filiationList',
  };
  return (
    <div>
      <SecondTitle module="分支机构" />
      <PdfTable {...data} />
    </div>
  );
}

FiliationList.propTypes = {
  moduleData: PropTypes.object,
};
export default inject('pdfStore')(observer(FiliationList));
