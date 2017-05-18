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
        {judgeIsModuleExist('RISK_ANNOUNCEMENT') ? <CourtAnnouncement moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.courtAnnouncement.data')} /> : ''}
        {judgeIsModuleExist('RISK_NOTICE') ? <CourtNotice moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.courtNotice.data')} /> : ''}
        {judgeIsModuleExist('RISK_JUDGEMENT') ? <JudgeDoc moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.judgeDoc.data')} /> : ''}
        {judgeIsModuleExist('RISK_EXECUTE') ? <ExcutedInfo moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.courtExecution.data')} /> : ''}
        {judgeIsModuleExist('RISK_DISHONESTY') ? <DishonestyInfo moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.dishonestyList.data')} /> : ''}
        {judgeIsModuleExist('RISK_LITIGATION') ? <LitigationAssets moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.litigationAssets.data')} /> : ''}
        {judgeIsModuleExist('RISK_TAXATION') ? <TaxCredit moduleData={pathval.getPathValue(pdfStore, 'risk.data.taxList')} /> : ''}
        {judgeIsModuleExist('RISK_ABNORMAL') ? <OperateError moduleData={pathval.getPathValue(pdfStore, 'risk.data.corpDetailPunish.abnormalOperation')} /> : ''}
        {judgeIsModuleExist('RISK_CHECK') ? <CheckInfo {...this.props} /> : ''}
      </div>
    </div>
  );
}

Risk.propTypes = {
  foo: PropTypes.string,
};
export default inject('pdfStore')(observer(Risk));
