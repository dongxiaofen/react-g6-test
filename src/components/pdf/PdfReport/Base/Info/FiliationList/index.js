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
      {'key': 'brName', 'width': '4'},
      {'key': 'brRegno', 'width': '2'},
      {'key': 'belong_org', 'width': '4'},
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
