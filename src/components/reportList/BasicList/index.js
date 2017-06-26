import React from 'react';
import {observer} from 'mobx-react';
import {loadingComp} from 'components/hoc';
import Pager from 'components/common/Pager';
import ListItem from '../ListItem';
import NoReport from '../NoReport';

function BasicList({reportListStore}) {
  const data = reportListStore.basicList.content;
  const createList = () => {
    return data.map((item, idx) => {
      return <ListItem listType="basic" data={item} key={idx}/>;
    });
  };

  if (data.length === 0) {
    const noResultMessage = reportListStore.isShowNoResultMessage ? '没有找到相关企业，请更换关键字试试' : '';
    return <NoReport noResultMessage={noResultMessage}/>;
  }
  return (
    <div>
      {createList()}
      <Pager
        tData={data}
        module="basicReportPager"
        type="large"/>
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.reportListStore.basicList.content === undefined ? true : false,
    imgCategory: 3,
    category: 2,
    errCategory: 2,
    module: '基础报告',
    error: props.reportListStore.basicList.error,
  })
})(observer(BasicList));
