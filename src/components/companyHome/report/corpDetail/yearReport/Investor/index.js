import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
// import styles from './index.less';

function Investor({yearReportList, yearReportTab, isLoading}) {
  let listData = {};
  let listNum = 0;
  if (yearReportList && yearReportList.length > 0) {
    if (yearReportTab && yearReportTab.length > 0) {
      yearReportList.map((obj)=>{
        if (obj.investorInformations) {
          if (yearReportTab === obj.year) {
            listData = obj.investorInformations;
            listNum = obj.investorInformations.length;
          }
        }
      });
    } else {
      if (yearReportList[0] && yearReportList[0].investorInformations) {
        listData = yearReportList[0].investorInformations;
        listNum = yearReportList[0].investorInformations.length;
      }
    }
  }
  const data = {
    meta: {
      tData: listData,
      dict: 'yearInvestor',
      body: [
        { 'key': 'shareholderName', 'width': '2' },
        { 'key': 'subConam', 'width': '2' },
        { 'key': 'subConDate', 'width': '1' },
        { 'key': 'subConType', 'width': '1' },
        { 'key': 'paidConMoney', 'width': '2' },
        { 'key': 'paidTime', 'width': '1' },
        { 'key': 'paidType', 'width': '1' },
      ]
    },
    isLoading: isLoading,
    module: '股东及出资信息',
    error: listNum === 0
  };
  return (
    <div>
      <ModuleTitle module="股东及出资信息" count={listNum} />
      <CommonTable {...data} />
    </div>
  );
}

Investor.propTypes = {
  yearReportList: PropTypes.object,
  yearReportTab: PropTypes.string,
  isLoading: PropTypes.bool,
};
export default observer(Investor);
