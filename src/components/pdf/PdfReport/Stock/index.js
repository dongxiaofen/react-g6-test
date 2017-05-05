import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfTitle from 'components/common/pdf/PdfTitle';
import CompanyInfo from './StockInfo/CompanyInfo';
import ShareHolder from './StockInfo/ShareHolder';
import CirculateHolder from './StockInfo/CirculateHolder';
import Executive from './StockInfo/Executive';
import Statistics from './Announcement/Statistics';
import Bulletin from './Announcement/Bulletin';
import pathval from 'pathval';


function Stock({judgeIsModuleExist, pdfStore}) {
  return (
    <div>
      {
        judgeIsModuleExist('STOCK_INFO')
          ?
          <div>
            <PdfTitle module="上市披露" subModule="公司概况" />
            <CompanyInfo moduleData={pathval.getPathValue(pdfStore, 'company.brief')} stockCode={pathval.getPathValue(pdfStore, 'banner.stockCode')} />
            <ShareHolder moduleData={pathval.getPathValue(pdfStore, 'company.shareHolder')} />
            <CirculateHolder moduleData={pathval.getPathValue(pdfStore, 'company.circulateShareHolder')}/>
            <Executive moduleData={pathval.getPathValue(pdfStore, 'company.management')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('STOCK_ANNOUNCEMENT')
          ?
          <div>
            <PdfTitle module="上市披露" subModule="公司公告" />
            <Statistics {...this.props}/>
            <Bulletin {...this.props}/>
          </div>
          :
          ''
      }
    </div>
  );
}

Stock.propTypes = {
  judgeIsModuleExist: PropTypes.func,
};
export default inject('pdfStore')(observer(Stock));
