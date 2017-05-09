import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';


function AssetsInfo({moduleData}) {
  if (moduleData === undefined || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="企业资产状况信息(单位：万元)"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'generalAssets', 'width': '6'},
      {'key': 'ownersEequity', 'width': '6'},
      {'key': 'revenue', 'width': '6'},
      {'key': 'profit', 'width': '6'},
      {'key': 'mainRevenue', 'width': '6'},
      {'key': 'netProfit', 'width': '6'},
      {'key': 'taxPayment', 'width': '6'},
      {'key': 'liability', 'width': '6'},
    ],
    item: moduleData,
    dict: 'yearAssetsInfo',
    type: 'object',
    hasConfig: true,
  };
  return (
    <div>
      <SecondTitle module="企业资产状况信息(单位：万元)" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

AssetsInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(AssetsInfo);
