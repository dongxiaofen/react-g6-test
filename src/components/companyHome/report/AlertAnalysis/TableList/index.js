import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';
import TableRow from './TableRow';
import styles from './index.less';
function TableList({dataStore}) {
  const data = dataStore.listData.content;
  const createTable = () => {
    return data.map( (item, index) => {
      return (
        <TableRow
          key={`keys${index}`}
          data={item}
          dataStore={dataStore}
          />
      );
    });
  };
  return (
    <div>
      <div className={styles.tableList}>
        {createTable()}
      </div>
      <Pager module={dataStore.module} type="small" />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.dataStore.listData.content === undefined ? true : false,
    error: props.dataStore.listData.error,
    height: 100,
  }),
})(observer(TableList));
