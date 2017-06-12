import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';
import ListItem from '../ListItem';
import NoReport from '../NoReport';

function AdvancedList({reportListStore}) {
  const data = reportListStore.advancedList.content;
  const createList = () => {
    return data.map((item, idx) => {
      return <ListItem data={item} key={idx} />;
    });
  };
  if (data.length === 0) {
    return <NoReport />;
  }
  return (
    <div>
      {createList()}
      <Pager
        tData={data}
        module="advancedReportPager"
        type="large" />
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.reportListStore.advancedList.content === undefined ? true : false,
    imgCategory: 14,
    category: 2,
    errCategory: 2,
    module: '高级报告',
    error: props.reportListStore.advancedList.error,
  })
})(observer(AdvancedList));
