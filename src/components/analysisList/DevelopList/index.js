import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';
import ListItem from '../ListItem';
import NoAnalysis from '../NoAnalysis';

function DevelopList({analysisListStore}) {
  const data = analysisListStore.developList.content;
  const createList = () => {
    return data.map((item, idx) => {
      return <ListItem reportRoute="growthAbilityEval" data={item} key={idx} />;
    });
  };
  if (data.length === 0) {
    const noResultMessage = analysisListStore.isShowNoResultMessage ? '没有找到相关企业，请更换关键字试试' : '';
    return <NoAnalysis noResultMessage={noResultMessage}/>;
  }
  return (
    <div>
      {createList()}
      <Pager
        tData={data}
        module="developAnalysisPager"
        type="large" />
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.analysisListStore.developList.content === undefined ? true : false,
    imgCategory: 3,
    category: 2,
    errCategory: 2,
    module: '成长能力分析',
    error: props.analysisListStore.developList.error,
  })
})(observer(DevelopList));
