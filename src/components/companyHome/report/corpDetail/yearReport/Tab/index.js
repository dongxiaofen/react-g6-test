import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import TabItem from './TabItem';

function Tab({yearReportList, yearReportTab, isLoading, setYearReport}) {
  const data = {
    yearReportTab: yearReportTab,
    setYearReport: setYearReport,
    items: yearReportList,
    isLoading: isLoading,
    module: '企业年份',
    error: yearReportList.length === 0
  };
  return (
    <div>
      <TabItem {...data} />
    </div>
  );
}

Tab.propTypes = {
  yearReportList: PropTypes.object,
  yearReportTab: PropTypes.string,
  isLoading: PropTypes.bool,
  setYearReport: PropTypes.func,
};
export default observer(Tab);
