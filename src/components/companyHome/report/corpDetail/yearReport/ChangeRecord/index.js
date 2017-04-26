import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
// import styles from './index.less';

function ChangeRecord({yearReportList, yearReportTab, isLoading}) {
  let listData = {};
  let listNum = 0;
  if (yearReportList && yearReportList.length > 0) {
    if (yearReportTab.length > 0) {
      yearReportList.map((obj)=>{
        if (yearReportTab === obj.year) {
          listData = obj.changeRecords;
          listNum = obj.changeRecords.length;
        }
      });
    } else {
      listData = yearReportList[0].changeRecords;
      listNum = yearReportList[0].changeRecords.length;
    }
  }
  const data = {
    meta: {
      tData: listData,
      dict: 'yearChangeRecords',
      body: [
        { 'key': 'changedItem', 'width': '2' },
        { 'key': 'beforeChange', 'width': '3' },
        { 'key': 'afterChange', 'width': '3' },
        { 'key': 'time', 'width': '2' },
      ],
    },
    isLoading: isLoading,
    module: '修改记录',
    error: listNum === 0
  };
  return (
    <div>
      <ModuleTitle module="修改记录" count={listNum} />
      <CommonTable {...data} />
    </div>
  );
}

ChangeRecord.propTypes = {
  yearReportList: PropTypes.object,
  yearReportTab: PropTypes.string,
  isLoading: PropTypes.bool,
};
export default observer(ChangeRecord);
