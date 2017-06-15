import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function ExternalPerson({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="对外投资"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      {'key': 'entType', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      {'key': 'fundedRatio', 'width': '6'},
      {'key': 'subConam', 'width': '6'},
      {'key': 'regCap', 'width': '6'},
      {'key': 'frName', 'width': '6'},
      {'key': 'regNo', 'width': '6'},
      {'key': 'regOrg', 'width': '6'},
    ],
    item: moduleData,
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };
  return (
    <div>
      <SecondTitle module="对外投资"/>
      <PdfSimpleKey {...data} />
    </div>
  );
}

ExternalPerson.propTypes = {
  foo: PropTypes.string,
};
export default observer(ExternalPerson);
