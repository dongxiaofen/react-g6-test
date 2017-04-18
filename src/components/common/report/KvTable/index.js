import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Cell from './Cell';
import styles from './index.less';
import config from 'dict/reportModule';
import { loadingComp } from 'components/hoc';

function KvTable({ meta, items, dict }) {
  if (!items) {
    return null;
  }
  return (
    <div className={styles.box}>
      {
        meta.map((cell) => {
          return <Cell key={cell.key} type={cell.type} theKey={config[dict][cell.key]} theValue={items[cell.key]} />;
        })
      }
    </div>
  );
}

KvTable.propTypes = {
  foo: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: false,
    errCategory: 1
  })
})(observer(KvTable));

// {/* <Cell type="half" theKey="theKey1" theValue="theValue11111" />
//       <Cell type="half" theKey="theKey2" theValue="theValue2" />
//       <Cell type="half" theKey="theKey3" theValue="theValue3" />
//       <Cell type="half" theKey="theKey4" theValue="theValue4" />
//       <Cell type="full" theKey="theKey5" theValue="theValue5" />
//        */}
