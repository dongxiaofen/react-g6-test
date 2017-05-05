import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import TradeMark from './IntangibleAssets/TradeMark';
import Patent from './IntangibleAssets/Patent';
import Bidding from './IntangibleAssets/Bidding';
import Consumption from './Comprehensive/Consumption';
import Facilities from './Comprehensive/Facilities';
import Stable from './Comprehensive/Stable';
import PdfTitle from 'components/common/pdf/PdfTitle';
import pathval from 'pathval';

function Assets({judgeIsModuleExist, clientStore, pdfStore}) {
  // 只有电信版才显示电信数据
  const isDianXin = clientStore.envConfig.includes('dianxin');
  let operationTel = '';
  if (isDianXin && judgeIsModuleExist('OPERATION_TEL')) {
    operationTel = (
      <div>
        <PdfTitle module="经营信息" subModule="企业综合信息" />
        <Consumption {...this.props} />
        <Facilities {...this.props} />
        <Stable {...this.props} />
      </div>
    );
  }
  return (
    <div>
      {operationTel}
      <div>
        <PdfTitle module="经营信息" subModule="无形资产/招投标" />
        <TradeMark moduleData={pathval.getPathValue(pdfStore, 'trademark.content')} />
        <Patent moduleData={pathval.getPathValue(pdfStore, 'patent.content')} />
        <Bidding moduleData={pathval.getPathValue(pdfStore, 'bidding.content')} />
      </div>
    </div>
  );
}

Assets.propTypes = {
  judgeIsModuleExist: PropTypes.func,
  pdfStore: PropTypes.object,
  clientStore: PropTypes.object,
};
export default inject('clientStore', 'pdfStore')(observer(Assets));
