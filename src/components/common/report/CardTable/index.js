import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
// import styles from './index.less';
import { loadingComp } from 'components/hoc';
import Pager from '../../Pager';
import Card from './Card';

function CardTable({meta, uiStore}) {
  const {index, size} = uiStore.uiState[meta.dict];
  const cData = meta.cData.slice((index - 1) * size, index * size);
  return (
    <div>
      {
        cData.map((data, idx) => {
          const serialNum = size * (index - 1) + idx;
          return <Card key={data.title + idx} meta={meta} cData={data} serialNum={serialNum} />;
        })
      }
      <Pager module={meta.dict} tData={meta.cData} type="small" />
    </div>
  );
}

CardTable.propTypes = {
  meta: PropTypes.object.isRequired
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    errCategory: 1,
    module: props.module
  })
})(inject('uiStore')(observer(CardTable)));
