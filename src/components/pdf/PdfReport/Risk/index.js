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


function Risk({pdfStore}) {
  return (
    <div>
      <div>
        <PdfTitle module="风险信息" subModule="法务信息" />
        <CourtCount moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.countCount')} />
        <CourtAnnouncement moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.courtAnnouncement.data')} />
        <CourtNotice moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.courtNotice.data')} />
        <JudgeDoc moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.courtNotice.data')} />
        <ExcutedInfo moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.courtExecution.data')} />
        <DishonestyInfo moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.dishonestyList.data')} />
        <LitigationAssets moduleData={pathval.getPathValue(pdfStore, 'risk.data.court.litigationAssets.data')} />
      </div>
      <div>
        <PdfTitle module="风险信息" subModule="税务公示信息" />
        <TaxCredit moduleData={pathval.getPathValue(pdfStore, 'risk.data.taxList')} />
      </div>
      <div>
        <PdfTitle module="风险信息" subModule="工商公示信息" />
        <OperateError moduleData={pathval.getPathValue(pdfStore, 'risk.data.corpDetailPunish.abnormalOperation')} />
        <CheckInfo {...this.props} />
      </div>
    </div>
  );
}

Risk.propTypes = {
  foo: PropTypes.string,
};
export default inject('pdfStore')(observer(Risk));
