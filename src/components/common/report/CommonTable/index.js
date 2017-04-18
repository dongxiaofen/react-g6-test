import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Thead from './Thead';
import Tbody from './Tbody';
import styles from './index.less';

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
  foo: PropTypes.string,
};
export default observer(CommonTable);
