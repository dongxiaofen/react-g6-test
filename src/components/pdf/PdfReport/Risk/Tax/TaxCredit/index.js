import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function TaxCredit({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="纳税信用" />
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'blackType', 'width': '6'},
      {'key': 'evalDate', 'width': '6'},
      {'key': 'taxOrg', 'width': '6'},
      {'key': 'taxOrgType', 'width': '6', 'styles': 'hide'},
      {'key': 'areaName', 'width': '6', 'styles': 'hide'},
      {'key': 'managerOrg', 'width': '6', 'styles': 'hide'},
      {'key': 'taxType', 'width': '6', 'styles': 'hide'},
      {'key': 'taxSum', 'width': '6', 'styles': 'hide'},
      {'key': 'isOwingTax', 'width': '6', 'styles': 'hide'},
      {'key': 'illegal', 'width': '6', 'styles': 'hide'},
      {'key': 'evalReason', 'width': '6', 'styles': 'hide'},
      {'key': 'financeName', 'width': '6', 'styles': 'hide'},
      {'key': 'financeCardNo', 'width': '6', 'styles': 'hide'},
      {'key': 'address', 'width': '6', 'styles': 'hide'},
      {'key': 'contactPhone', 'width': '6', 'styles': 'hide'},
    ],
    item: moduleData,
    dict: 'taxPublicInfo',
    hasConfig: true,
    type: 'array'
  };
  return (
    <div>
      <SecondTitle module="纳税信用" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

TaxCredit.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(TaxCredit);
