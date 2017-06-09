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
        module="developAnalysisPager"
        type="large" />
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.analysisListStore.developList.content === undefined ? true : false,
    imgCategory: 14,
    category: 2,
    errCategory: 2,
    module: '成长能力分析',
    error: props.analysisListStore.developList.error,
  })
})(observer(DevelopList));
