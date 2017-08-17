import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Tbody from './Tbody';
import styles from './index.less';
import { loadingComp } from 'components/hoc';

function KvTable({ meta }) {
  return (
    <table className={styles.table}>
      <Tbody meta={meta.body} items={meta.items} dict={meta.dict} />
    </table>
  );
}

KvTable.propTypes = {
  meta: PropTypes.object.isRequired
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    module: props.module
  })
})(observer(KvTable));
