import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function Investment({ moduleData }) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module={`投资的企业`}/>
        <PdfNotFound />
      </div>
    );
  }
  const parseNumber = (value) => {
    if (!isNaN(parseFloat(value))) {
      return parseFloat(value).toFixed(2);
    }
    return value;
  };
  const data = {
    dataConfig: [
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      // {'key': 'entType', 'width': '6'},
      {'key': 'subConam', 'width': '6', handle: parseNumber},
      {'key': 'fundedRatio', 'width': '6'},
      {'key': 'regCap', 'width': '6', handle: parseNumber},
      {'key': 'esDate', 'width': '6'},
      // {'key': 'frName', 'width': '6'},
      // {'key': 'regNo', 'width': '6'},
      // {'key': 'regOrg', 'width': '6'},
    ],
    item: moduleData,
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };
  return (
    <div>
      <SecondTitle module={`（${moduleData[0].name}）投资的企业（${moduleData.length}）`} />
      <PdfSimpleKey {...data} />
    </div>
  );
}

Investment.propTypes = {
  foo: PropTypes.object,
};
export default inject('pdfStore')(observer(Investment));
