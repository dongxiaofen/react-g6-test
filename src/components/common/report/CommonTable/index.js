import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Thead from './Thead';
import Tbody from './Tbody';
import styles from './index.less';
import { loadingComp } from 'components/hoc';
import Pager from '../../Pager';

function CommonTable({meta, uiStore}) {
  const {index, size} = uiStore.uiState[meta.dict];
  return (
    <div>
      <table className={styles.table}>
        <Thead meta={meta.body} dict={meta.dict} />
        <Tbody meta={meta.body} tData={meta.tData.slice((index - 1) * size, index * size)} />
      </table>
      <div className={styles.pager}>
        <Pager module={meta.dict} tData={meta.tData} type="small" />
      </div>
    </div>
  );
}

CommonTable.propTypes = {
  meta: PropTypes.object.isRequired
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    module: props.module
  })
})(inject('uiStore')(observer(CommonTable)));
