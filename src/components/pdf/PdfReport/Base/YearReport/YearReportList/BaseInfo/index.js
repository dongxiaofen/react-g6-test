import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function BaseInfo({moduleData}) {
  if (moduleData === undefined || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="企业基本信息"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'regNo', 'width': '6'},
      {'key': 'enterpriseStatus', 'width': '6'},
      {'key': 'employeeCount', 'width': '6'},
      {'key': 'zipcode', 'width': '6'},
      {'key': 'phone', 'width': '6'},
      {'key': 'email', 'width': '6'},
      {'key': 'address', 'width': '6'},
      {'key': 'buyEquity', 'width': '6'},
      {'key': 'equityTransfer', 'width': '6'},
    ],
    item: moduleData,
    dict: 'yearBaseInfo',
    hasConfig: true,
    type: 'object'
  };
  return (
    <div>
      <SecondTitle module="企业基本信息" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

BaseInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(BaseInfo);
