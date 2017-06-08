import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';
import ListItem from '../ListItem';
import NoAnalysis from '../NoAnalysis';

function ProfitList({analysisListStore}) {
  const data = analysisListStore.profitList.content;
  const createList = () => {
    return data.map((item, idx) => {
      return <ListItem data={item} key={idx} />;
    });
  };
  if (data.length === 0) {
    return <NoAnalysis />;
  }
  return (
    <div>
      {createList()}
      <Pager
        tData={data}
        module="profitAnalysisPager"
        type="large" />
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.analysisListStore.profitList.content === undefined ? true : false,
    imgCategory: 14,
    category: 2,
    errCategory: 2,
    module: '盈利能力分析',
    error: props.analysisListStore.profitList.error,
  })
})(observer(ProfitList));
