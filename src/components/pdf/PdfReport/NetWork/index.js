import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import CurrentNetwork from './CurrentNetwork';
import BlackNetWork from './BlackNetWork';
import PdfTitle from 'components/common/pdf/PdfTitle';
import pathval from 'pathval';

function NetWork({judgeIsModuleExist, pdfStore}) {
  return (
    <div>
      {
        judgeIsModuleExist('NETWORK_RELEVANCE')
          ?
          <div>
            <PdfTitle module="关联网络" subModule="关联网络图信息" />
            <CurrentNetwork pdfStore={pdfStore} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('NETWORK_BLACKLIST')
          ?
          <div>
            <PdfTitle module="关联网络" subModule="风险关联信息" />
            < BlackNetWork moduleData={pathval.getPathValue(pdfStore, 'blacklist')} />
          </div>
          :
          ''
      }
    </div>
  );
}

NetWork.propTypes = {
  judgeIsModuleExist: PropTypes.func,
};
export default inject('pdfStore')(observer(NetWork));
