import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Thead from './Thead';
import Tbody from './Tbody';
import styles from './index.less';
import { loadingComp } from 'components/hoc';
import Pager from '../Pager';

function CommonTable({meta, tData, dict, uiStore}) {
  const {index, size} = uiStore.uiState[dict];
  return (
    <div>
      <table className={styles.table}>
        <Thead meta={meta} dict={dict} />
        <Tbody meta={meta} tData={tData.slice((index - 1) * size, index * size)} />
      </table>
      <Pager dict={dict} tData={tData} />
    </div>
  );
}

CommonTable.propTypes = {
  meta: PropTypes.array.isRequired,
  tData: PropTypes.object.isRequired,
  dict: PropTypes.string.isRequired
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    errCategory: 1,
    module: props.module
  })
})(inject('uiStore')(observer(CommonTable)));
