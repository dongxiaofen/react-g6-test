import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
// import styles from './index.less';

function Website({yearReportList, yearReportTab, isLoading}) {
  let listData = {};
  let listNum = 0;
  if (yearReportList && yearReportList.length > 0) {
    if (yearReportTab.length > 0) {
      yearReportList.map((obj)=>{
        if (yearReportTab === obj.year) {
          listData = obj.websiteList;
          listNum = obj.websiteList.length;
        }
      });
    } else {
      listData = yearReportList[0].websiteList;
      listNum = yearReportList[0].websiteList.length;
    }
  }
  const data = {
    meta: {
      tData: listData,
      dict: 'yearWebsite',
      body: [
        { 'key': 'type', 'width': '3' },
        { 'key': 'name', 'width': '4' },
        { 'key': 'link', 'width': '3' },
      ],
    },
    isLoading: isLoading,
    module: '网站或网店信息',
    error: listNum === 0
  };
  return (
    <div>
      <ModuleTitle module="网站或网店信息" count={listNum} />
      <CommonTable {...data} />
    </div>
  );
}

Website.propTypes = {
  yearReportList: PropTypes.object,
  yearReportTab: PropTypes.string,
  isLoading: PropTypes.bool,
};
export default observer(Website);
