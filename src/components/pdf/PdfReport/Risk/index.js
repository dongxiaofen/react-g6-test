import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfTitle from 'components/common/pdf/PdfTitle';
import CourtCount from './Court/CourtCount';
import CourtAnnouncement from './Court/CourtAnnouncement';
import CourtNotice from './Court/CourtNotice';
import JudgeDoc from './Court/JudgeDoc';
import ExcutedInfo from './Court/ExcutedInfo';
import DishonestyInfo from './Court/DishonestyInfo';
import LitigationAssets from './Court/LitigationAssets';
import TaxCredit from './Tax/TaxCredit';
import OperateError from './Business/OperateError';
import CheckInfo from './Business/CheckInfo';
import pathval from 'pathval';


function Risk({pdfStore, judgeIsModuleExist}) {
  return (
    <div>
      <div>
        <PdfTitle module="风险信息" />
        <CourtCount moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.countCount')} />
        {judgeIsModuleExist('RISK_ANNOUNCEMENT') ?
        <div>
          <PdfTitle module="风险信息" />
          <CourtAnnouncement moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.courtAnnouncement.data')} />
        </div> : ''}
        {judgeIsModuleExist('RISK_NOTICE') ?
        <div>
          <PdfTitle module="风险信息" />
          <CourtNotice moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.courtNotice.data')} />
        </div> : ''}
        {judgeIsModuleExist('RISK_JUDGEMENT') ?
        <div>
          <PdfTitle module="风险信息" />
          <JudgeDoc moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.judgeDoc.data')} />
        </div> : ''}
        {judgeIsModuleExist('RISK_EXECUTE') ?
        <div>
          <PdfTitle module="风险信息" />
          <ExcutedInfo moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.courtExecution.data')} />
        </div> : ''}
        {judgeIsModuleExist('RISK_DISHONESTY') ?
        <div>
          <PdfTitle module="风险信息" />
          <DishonestyInfo moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.dishonestyList.data')} />
        </div> : ''}
        {judgeIsModuleExist('RISK_LITIGATION') ?
        <div>
          <PdfTitle module="风险信息" />
          <LitigationAssets moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.litigationAssets.data')} />
        </div> : ''}
        {judgeIsModuleExist('RISK_TAXATION') ?
        <div>
          <PdfTitle module="风险信息" />
          <TaxCredit moduleData={pathval.getPathValue(pdfStore, 'risk.data.taxList')} />
        </div> : ''}
        {judgeIsModuleExist('RISK_ABNORMAL') ?
        <div>
          <PdfTitle module="风险信息" />
          <OperateError moduleData={pathval.getPathValue(pdfStore, 'risk.data.corpDetailPunish.abnormalOperation')} />
        </div> : ''}
        {judgeIsModuleExist('RISK_CHECK') ?
        <div>
          <PdfTitle module="风险信息" />
          <CheckInfo moduleData={pathval.getPathValue(pdfStore, 'risk.data.corpDetailPunish.checkMessage')} />
        </div> : ''}
      </div>
    </div>
  );
}

Risk.propTypes = {
  foo: PropTypes.string,
};
export default inject('pdfStore')(observer(Risk));
