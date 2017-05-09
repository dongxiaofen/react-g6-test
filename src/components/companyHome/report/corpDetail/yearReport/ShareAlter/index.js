import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
// import styles from './index.less';

function ShareAlter({yearReportList, yearReportTab, isLoading}) {
  let listData = {};
  let listNum = 0;
  if (yearReportList && yearReportList.length > 0) {
    if (yearReportTab && yearReportTab.length > 0) {
      yearReportList.map((obj)=>{
        if (obj.equityChangeInformations) {
          if (yearReportTab === obj.year) {
            listData = obj.equityChangeInformations;
            listNum = obj.equityChangeInformations.length;
          }
        }
      });
    } else {
      if (yearReportList[0] && yearReportList[0].equityChangeInformations) {
        listData = yearReportList[0].equityChangeInformations;
        listNum = yearReportList[0].equityChangeInformations.length;
      }
    }
  }
  const data = {
    meta: {
      tData: listData,
      dict: 'yearEquityChange',
      body: [
        { 'key': 'shareholderName', 'width': '2' },
        { 'key': 'equityBefore', 'width': '3' },
        { 'key': 'equityAfter', 'width': '3' },
        { 'key': 'time', 'width': '2' },
      ],
    },
    isLoading: isLoading,
    module: '股权变更信息',
    error: listNum === 0
  };
  return (
    <div>
      <ModuleTitle module="股权变更信息" count={listNum} />
      <CommonTable {...data} />
    </div>
  );
}

ShareAlter.propTypes = {
  yearReportList: PropTypes.object,
  yearReportTab: PropTypes.string,
  isLoading: PropTypes.bool,
};
export default observer(ShareAlter);
