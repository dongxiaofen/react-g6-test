import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfTitle from 'components/common/pdf/PdfTitle';
import RegisterInfo from '../Base/Info/RegisterInfo';
import ShareHolder from '../Base/Info/ShareHolder';
import PersonListData from '../Base/Info/PersonListData';
import FiliationList from '../Base/Info/FiliationList';
import Enterprise from '../Base/Foreign/Enterprise';
import Investment from '../Base/Foreign/Investment';
import Office from '../Base/Foreign/Office';
import AlterAnalysis from '../Base/Alter/AlterAnalysis';
import AlterList from '../Base/Alter/AlterList';
import YearReportList from '../Base/YearReport/YearReportList';
import Tax from '../Base/Tax';
import pathval from 'pathval';


function Base({ judgeIsModuleExist, pdfStore }) {
  return (
    <div>
      {
        judgeIsModuleExist('CORP_BASIC')
          ?
          <div>
            <PdfTitle module="基本信息" subModule="工商基本信息" />
            <RegisterInfo moduleData={pathval.getPathValue(pdfStore, 'report.corpDetail.basicList')} />
            <ShareHolder moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.shareHolderList')} />
            <PersonListData moduleData={pathval.getPathValue(pdfStore, 'report.corpDetail.personList')} />
            <FiliationList moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.filiationList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('CORP_INV_POS')
          ?
          <div>
            <PdfTitle module="基本信息" subModule="对外投资任职" />
            <Enterprise moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.entinvItemList')} />
            <Investment moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.frinvList')} />
            <Office moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.frPositionList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('CORP_ALTER')
          ?
          <div>
            <PdfTitle module="基本信息" subModule="工商变更" />
            <AlterAnalysis moduleData = {pathval.getPathValue(pdfStore, 'report.tendency.result[0].data')} />
            <AlterList moduleData = {pathval.getPathValue(pdfStore, 'report.tendency.result[0].alterList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('CORP_YEAR_REPORT')
          ?
          <div>
            <PdfTitle module="基本信息" subModule="企业年报" />
            <YearReportList moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.yearReportList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('CORP_YEAR_REPORT')
          ?
          <div>
            <PdfTitle module="基本信息" subModule="税务信息" />
            {/* <Tax moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.taxList')} /> */}
            <Tax moduleData = {pathval.getPathValue(pdfStore, 'testTaxList')} />
          </div>
          :
          ''
      }
    </div>
  );
}

Base.propTypes = {
  judgeIsModuleExist: PropTypes.func,
};
export default inject('pdfStore')(observer(Base));
