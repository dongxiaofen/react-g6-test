import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import TableList from './TableList';
import styles from './TableList/index.less';
import { loadingComp } from 'components/hoc';

function AlertAnalysis({dataStore, uiStore}) {
  const len = uiStore.uiState[dataStore.module].totalElements;
  return (
    <div className={styles.box}>
      <ModuleTitle module="预警信息" count={len} />
      <TableList dataStore={dataStore} />
    </div>
  );
}

AlertAnalysis.propTypes = {
  foo: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.dataStore.isLoading,
  }),
})(inject('uiStore')(observer(AlertAnalysis)));
