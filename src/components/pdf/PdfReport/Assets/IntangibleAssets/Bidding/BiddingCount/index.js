import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';

function BiddingCount({moduleData}) {
  if (!moduleData) {
    return (
      <div>
        <div style={{height: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {key: 'courtAnnouncement', width: '1.5'},
      {key: 'courtNotice', width: '1.5'},
      {key: 'judgeDoc', width: '1.5'},
      {key: 'courtExecution', width: '2'},
      {key: 'dishonestyList', width: '2.5'},
    ],
    items: [
      {
        courtAnnouncement: moduleData['总投标'],
        courtNotice: moduleData['开庭公告'],
        judgeDoc: moduleData['判决文书'],
        courtExecution: moduleData['被执行人信息'],
      },
    ],
    dict: 'biddingCount',
  };
  return (
    <div>
      <div style={{height: '30px'}}></div>
      <PdfTable {...data} />
    </div>
  );
}

BiddingCount.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(BiddingCount);
