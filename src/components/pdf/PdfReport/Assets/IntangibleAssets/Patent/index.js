import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function Patent({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="专利信息"/>
        <PdfNotFound />
      </div>
    );
  }
  const modifyClassFication = (key, value, rowData) => {
    return rowData.classificationNumber[key];
  }
  const data = {
    dataConfig: [
      {'key': 'title', 'width': '6'},
      {'key': 'type', 'width': '6'},
      {'key': 'applyDate', 'width': '6'},
      {'key': 'applyNum', 'width': '6'},
      {'key': 'classificationNumbercname', 'width': '6', handle: modifyClassFication.bind(this, 'cname')},
      {'key': 'authPubDate', 'width': '6'},
      {'key': 'authPubNum', 'width': '6'},
      {'key': 'inventionPerson', 'width': '6'},
      {'key': 'classificationNumberNumber', 'width': '12', handle: modifyClassFication.bind(this, 'number')},
      {'key': 'description', 'width': '12'},
    ],
    item: moduleData,
    dict: 'patentInfo',
    hasConfig: true,
    type: 'array'
  };
  return (
    <div>
      <SecondTitle module="专利信息" />
      <PdfSimpleKey {...data}/>
    </div>
  );
}

Patent.propTypes = {
  moduleData: PropTypes.array,
};
export default observer(Patent);
