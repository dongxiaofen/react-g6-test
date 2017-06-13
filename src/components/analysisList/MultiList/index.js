import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';
import ListItem from '../ListItem';
import NoAnalysis from '../NoAnalysis';

function MultiList({analysisListStore}) {
  const data = analysisListStore.multiList.content;
  const createList = () => {
    return data.map((item, idx) => {
      return <ListItem reportRoute="comprehenEval" data={item} key={idx} />;
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
        module="multiAnalysisPager"
        type="large" />
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.analysisListStore.multiList.content === undefined ? true : false,
    imgCategory: 14,
    category: 2,
    errCategory: 2,
    module: '多维综合评价',
    error: props.analysisListStore.multiList.error,
  })
})(observer(MultiList));
