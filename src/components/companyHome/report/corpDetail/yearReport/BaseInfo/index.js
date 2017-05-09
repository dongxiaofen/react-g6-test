import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, KvTable } from 'components/common/report';
// import styles from './index.less';

function BaseInfo({yearReportList, yearReportTab, isLoading}) {
  let listData = {};
  if (yearReportList && yearReportList.length > 0) {
    if (yearReportTab && yearReportTab.length > 0) {
      yearReportList.map((obj)=>{
        if (obj.baseInfo) {
          if (yearReportTab === obj.year) {
            listData = obj.baseInfo;
          }
        }
      });
    } else {
      if (yearReportList[0] && yearReportList[0].baseInfo) {
        listData = yearReportList[0].baseInfo;
      }
    }
  }
  const data = {
    meta: {
      items: listData,
      dict: 'yearBaseInfo',
      body: [
        [{ 'key': 'name', 'type': 'half' }, { 'key': 'regNo', 'type': 'half' }],
        [{ 'key': 'enterpriseStatus', 'type': 'half' }, { 'key': 'employeeCount', 'type': 'half' }],
        [{ 'key': 'zipcode', 'type': 'half' }, { 'key': 'phone', 'type': 'half' }],
        [{ 'key': 'email', 'type': 'half' }, { 'key': 'address', 'type': 'half' }],
        [{ 'key': 'buyEquity', 'type': 'half' }, { 'key': 'equityTransfer', 'type': 'half' }],
      ],
    },
    isLoading: isLoading,
    module: '企业基本信息',
    error: yearReportList && yearReportList.length === 0
  };
  return (
    <div>
      <ModuleTitle module="企业基本信息" />
      <KvTable {...data} />
    </div>
  );
}

BaseInfo.propTypes = {
  yearReportList: PropTypes.object,
  yearReportTab: PropTypes.string,
  isLoading: PropTypes.bool,
};
export default observer(BaseInfo);
