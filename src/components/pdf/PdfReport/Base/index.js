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
import Managements from '../Base/Foreign/Managements';
import pathval from 'pathval';


function Base({ judgeIsModuleExist, pdfStore }) {
  return (
    <div>
      {
        judgeIsModuleExist('CORP_BASIC')
          ?
          <div>
            <PdfTitle module="工商信息" subModule="照面信息" />
            <RegisterInfo moduleData={pathval.getPathValue(pdfStore, 'report.corpDetail.basicList')} />
            <ShareHolder moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.shareHolderList')} />
            <PersonListData moduleData={pathval.getPathValue(pdfStore, 'report.corpDetail.personList')} />
            <FiliationList moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.filiationList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('CORP_ALTER')
          ?
          <div>
            <PdfTitle module="工商信息" subModule="工商变更" />
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
            <PdfTitle module="工商信息" subModule="企业年报" />
            <YearReportList moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.yearReportList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('INV_POS_ENT')
          ?
          <div>
            <PdfTitle module="对外投资任职" subModule="企业对外投资" />
            <Enterprise moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.entinvItemList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('INV_POS_FR')
          ?
          <div>
            <PdfTitle module="对外投资任职" subModule="法人对外投资任职" />
            <Investment moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.frinvList')} />
            <Office moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.frPositionList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('INV_POS_MANAGEMENT')
          ?
          <div>
            <PdfTitle module="对外投资任职" subModule="董监高对外投资任职" />
            <Managements moduleData = {pathval.getPathValue(pdfStore, 'report.corpDetail.entinvItemList')} />
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
