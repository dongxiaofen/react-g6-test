import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';
import ListItem from '../ListItem';
import NoAnalysis from '../NoAnalysis';

function OperateList({analysisListStore}) {
  const data = analysisListStore.operateList.content;
  const createList = () => {
    return data.map((item, idx) => {
      return <ListItem reportRoute="operationEval" data={item} key={idx} />;
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
        module="operateAnalysisPager"
        type="large" />
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.analysisListStore.operateList.content === undefined ? true : false,
    imgCategory: 3,
    category: 2,
    errCategory: 2,
    module: '营运能力分析',
    error: props.analysisListStore.operateList.error,
  })
})(observer(OperateList));