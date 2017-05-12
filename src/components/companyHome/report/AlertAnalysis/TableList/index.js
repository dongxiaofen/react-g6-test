import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';
import TableRow from './TableRow';
import styles from './index.less';
function TableList({alertAnalysisStore}) {
  const data = alertAnalysisStore.listData.content;
  const createTable = () => {
    return data.map(item => {
      return (
        <TableRow
          key={item.id}
          data={item}
          alertAnalysisStore={alertAnalysisStore}
          />
      );
    });
  };
  return (
    <div>
      <div className={styles.tableList}>
        {createTable()}
      </div>
      <Pager module="alertAnalysis" type="small" />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.alertAnalysisStore.listData.content === undefined ? true : false,
    error: props.alertAnalysisStore.listData.error,
    height: 100,
  }),
})(observer(TableList));
