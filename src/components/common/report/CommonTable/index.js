import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Thead from './Thead';
import Tbody from './Tbody';
import styles from './index.less';
import { loadingComp } from 'components/hoc';

function CommonTable({meta, tData, dict }) {
  // let pageComp = <Pager {...this.props} reducerName={this.props.reducerName} />;
  // if (this.props.isNeedPager !== '1' || this.props.data.tData.size < tableSize) {
  //   pageComp = null;
  // }
  return (
    <div>
      <table className={styles.table}>
        <Thead meta={meta} dict={dict} />
        <Tbody meta={meta} tData={tData} />
      </table>
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
})(observer(CommonTable));
