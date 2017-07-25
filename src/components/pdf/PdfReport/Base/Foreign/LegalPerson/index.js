import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function LegalPerson({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module={`担任法人的企业`}/>
        <PdfNotFound />
      </div>
    );
  }
  const parseNumber = () => {
    let newArr = [];
    moduleData.map( (item) => {
      item.subConam = parseFloat(item.subConam).toFixed(2);
      item.regCap = parseFloat(item.regCap).toFixed(2);
      newArr = [...newArr, item];
    });
    return newArr;
  };
  const data = {
    dataConfig: [
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      // {'key': 'entType', 'width': '6'},
      // {'key': 'fundedRatio', 'width': '6'},
      // {'key': 'subConam', 'width': '6'},
      {'key': 'regCap', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      // {'key': 'frName', 'width': '6'},
      // {'key': 'regNo', 'width': '6'},
      // {'key': 'regOrg', 'width': '6'},
    ],
    item: parseNumber(),
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };
  return (
    <div>
      <SecondTitle module={`（${moduleData[0].name}）担任法人的企业（${moduleData.length}）`} />
      <PdfSimpleKey {...data} />
    </div>
  );
}

LegalPerson.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(LegalPerson);
