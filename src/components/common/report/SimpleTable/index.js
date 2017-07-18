import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';
import Pager from '../../Pager';
import DetailTable from 'components/common/report/alertAnalysis/DetailTable';

function SimpleTable({meta, module, uiStore}) {
  const {index, size, totalElements} = uiStore.uiState[meta.dict];
  const cData = totalElements ? meta.items : meta.items.slice((index - 1) * size, index * size);
  return (
    <div className={styles.simpleTable}>
      {
        cData.map((data, idx) => {
          const serialNum = size * (index - 1) + idx;
          return <DetailTable key={module + idx} itemData={data} rowIdx={serialNum} {...meta} />;
        })
      }
      <Pager module={meta.dict} tData={meta.items} type="small" />
    </div>
  );
}

SimpleTable.propTypes = {
  meta: PropTypes.object.isRequired,
  module: PropTypes.string.isRequired
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.meta.isLoading,
    category: 0,
    error: props.meta.error,
    module: props.meta.module
  })
})(inject('uiStore')(observer(SimpleTable)));
