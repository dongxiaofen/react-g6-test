import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, KvTable } from 'components/common/report';
// import styles from './index.less';

function AssetsInfo({yearReportList, yearReportTab, isLoading}) {
  let listData = {};
  if (yearReportList && yearReportList.length > 0) {
    if (yearReportTab.length > 0) {
      yearReportList.map((obj)=>{
        if (yearReportTab === obj.year) {
          listData = obj.assetsInfo;
        }
      });
    } else {
      listData = yearReportList[0].assetsInfo;
    }
  }
  const data = {
    meta: [
      [{ 'key': 'generalAssets', 'type': 'half' }, { 'key': 'ownersEequity', 'type': 'half' }],
      [{ 'key': 'revenue', 'type': 'half' }, { 'key': 'profit', 'type': 'half' }],
      [{ 'key': 'mainRevenue', 'type': 'half' }, { 'key': 'netProfit', 'type': 'half' }],
      [{ 'key': 'taxPayment', 'type': 'half' }, { 'key': 'liability', 'type': 'half' }],
    ],
    items: listData,
    dict: 'yearAssetsInfo',
    isLoading: isLoading,
    module: '企业资产状况信息(单位：万元)',
    error: yearReportList.length === 0
  };
  return (
    <div>
      <ModuleTitle module="企业资产状况信息(单位：万元)" />
      <KvTable {...data} />
    </div>
  );
}

AssetsInfo.propTypes = {
  yearReportList: PropTypes.object,
  yearReportTab: PropTypes.string,
  isLoading: PropTypes.bool,
};
export default observer(AssetsInfo);
