import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Tbody from './Tbody';
import styles from './index.less';
import { loadingComp } from 'components/hoc';

function KvTable({ meta, items, dict }) {
  return (
    <table className={styles.table}>
      <Tbody meta={meta} items={items} dict={dict} />
    </table>
  );
}

KvTable.propTypes = {
  meta: PropTypes.array.isRequired,
  items: PropTypes.object.isRequired,
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
})(observer(KvTable));
