import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function CourtCount({moduleData}) {
  if (!moduleData) {
    return (
      <div>
        <SecondTitle module="法务统计表" />
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {key: 'courtAnnouncement', width: '1.6'},
      {key: 'courtNotice', width: '1.6'},
      {key: 'judgeDoc', width: '1.7'},
      {key: 'courtExecution', width: '1.7'},
      {key: 'dishonestyList', width: '1.7'},
      {key: 'litigationAssets', width: '1.7'},
    ],
    items: [
      {
        courtAnnouncement: moduleData['法院公告'],
        courtNotice: moduleData['开庭公告'],
        judgeDoc: moduleData['判决文书'],
        courtExecution: moduleData['被执行人信息'],
        dishonestyList: moduleData['失信被执行人信息'],
        litigationAssets: moduleData['涉诉资产'],
      },
    ],
    dict: 'courtCount',
  };
  return (
    <div>
      <SecondTitle module="法务统计表" />
      <PdfTable {...data} />
    </div>
  );
}

CourtCount.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(CourtCount);
