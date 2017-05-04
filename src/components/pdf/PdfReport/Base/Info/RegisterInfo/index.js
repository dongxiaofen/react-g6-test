import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function RegisterInfo({ moduleData }) {
  if (moduleData === null || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="注册信息"/>
        <PdfNotFound />
      </div>
    );
  }
  const handleCap = (value) => {
    return value + '万人民币';
  };
  const data = {
    dataConfig: [
      {'key': 'enterpriseName', 'width': '6'},
      {'key': 'regNo', 'width': '6'},
      {'key': 'orgNum', 'width': '6'},
      {'key': 'socialCreditIdentifier', 'width': '6'},
      {'key': 'frName', 'width': '6'},
      {'key': 'enterpriseType', 'width': '6'},
      {'key': 'regCap', 'width': '6', 'handle': handleCap},
      {'key': 'address', 'width': '6'},
      {'key': 'regOrg', 'width': '6'},
      {'key': 'enterpriseStatus', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      {'key': 'operateScope', 'width': '12'},
    ],
    item: moduleData[0],
    dict: 'RegisterInfo',
    type: 'object',
    hasConfig: true,
  };
  return (
    <div>
      <SecondTitle module="注册信息" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

RegisterInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default inject('pdfStore')(observer(RegisterInfo));
