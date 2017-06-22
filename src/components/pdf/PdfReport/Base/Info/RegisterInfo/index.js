import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function RegisterInfo({ moduleData }) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="注册信息"/>
        <PdfNotFound />
      </div>
    );
  }
  const handleCap = (value) => {
    return parseFloat(value).toFixed(2) + '万人民币';
  };
  const date = (value, item) => {
    return `${value}至${item.openTo.length !== 0 ? item.openTo : '--'}`;
  };
  const data = {
    dataConfig: [
      {'key': 'enterpriseName', 'width': '6'},
      {'key': 'regNo', 'width': '6'},
      {'key': 'regOrg', 'width': '6'},
      {'key': 'recCap', 'width': '6'},
      {'key': 'openFrom', 'width': '6', 'handle': date},
      {'key': 'industryPhyName', 'width': '6'},
      {'key': 'frName', 'width': '6'},
      {'key': 'enterpriseType', 'width': '6'},
      {'key': 'regCap', 'width': '6', 'handle': handleCap},
      {'key': 'address', 'width': '6'},
      {'key': 'enterpriseStatus', 'width': '6'},
      {'key': 'industryName', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      {'key': 'ancheDate', 'width': '6'},
      {'key': 'cancelDate', 'width': '6'},
      {'key': 'abuItem', 'width': '6'},
      {'key': 'cbuItem', 'width': '12'},
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
