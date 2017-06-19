import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import TableList from './TableList';
import styles from './TableList/index.less';
import { loadingComp } from 'components/hoc';

function AlertAnalysis({dataStore, uiStore}) {
  const len = uiStore.uiState[dataStore.module].totalElements;
  const moduleTitle = dataStore.module === 'alertAnalysis' ? '风险信息' : '预警信息';
  return (
    <div className={styles.box}>
      <ModuleTitle module={moduleTitle} count={len} />
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
