import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
// import styles from './index.less';
import { loadingComp } from 'components/hoc';
import Pager from '../../Pager';
import Card from './Card';

function CardTable({meta, module, uiStore}) {
  const {index, size, totalElements} = uiStore.uiState[meta.dict];
  const cData = totalElements ? meta.cData : meta.cData.slice((index - 1) * size, index * size);
  return (
    <div>
      {
        cData.map((data, idx) => {
          const serialNum = size * (index - 1) + idx;
          return <Card key={module + idx} meta={meta} cData={data} serialNum={serialNum} />;
        })
      }
      <Pager module={meta.dict} tData={meta.cData} type="small" />
    </div>
  );
}

CardTable.propTypes = {
  meta: PropTypes.object.isRequired,
  module: PropTypes.string.isRequired
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    module: props.module
  })
})(inject('uiStore')(observer(CardTable)));
