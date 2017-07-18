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
import ShareholderInvestment from '../Base/Foreign/ShareholderInvestment';
import pathval from 'pathval';


function Base({ judgeIsModuleExist, pdfStore }) {
  return (
    <div>
      {
        judgeIsModuleExist('CORP_BASIC')
          ?
          <div>
            <PdfTitle module="工商信息" subModule="照面信息" />
            <RegisterInfo moduleData={pathval.getPathValue(pdfStore, 'crorpBasicData.basicList')} />
            <ShareHolder moduleData = {pathval.getPathValue(pdfStore, 'crorpBasicData.shareHolderList')} />
            <PersonListData moduleData={pathval.getPathValue(pdfStore, 'crorpBasicData.personList')} />
            <FiliationList moduleData = {pathval.getPathValue(pdfStore, 'crorpBasicData.filiationList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('CORP_ALTER')
          ?
          <div>
            <PdfTitle module="工商信息" subModule="工商变更" />
            <AlterAnalysis moduleData = {pathval.getPathValue(pdfStore, 'crorpAlterData.result[0].data')} />
            <AlterList moduleData = {pathval.getPathValue(pdfStore, 'crorpAlterData.result[0].alterList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('CORP_YEAR_REPORT')
          ?
          <div>
            <PdfTitle module="工商信息" subModule="企业年报" />
            <YearReportList moduleData = {pathval.getPathValue(pdfStore, 'crorpYearReportData')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('INV_POS_ENT')
          ?
          <div>
            <PdfTitle module="投资任职" subModule="企业投资" />
            <Enterprise moduleData = {pathval.getPathValue(pdfStore, 'entinvItemList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('INV_POS_FR')
          ?
          <div>
            <PdfTitle module="投资任职" subModule="法人投资任职" />
            <Investment moduleData = {pathval.getPathValue(pdfStore, 'frData.frinvList')} />
            <Office moduleData = {pathval.getPathValue(pdfStore, 'frData.frPositionList')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('INV_POS_MANAGEMENT')
          ?
          <div>
            <PdfTitle module="投资任职" subModule="董监高投资任职" />
            <Managements moduleData = {pathval.getPathValue(pdfStore, 'managements')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('INV_POS_SHAREHOLDER')
          ?
          <div>
            <PdfTitle module="投资任职" subModule="股东投资任职" />
            <ShareholderInvestment moduleData = {pathval.getPathValue(pdfStore, 'shareHolders')} />
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
