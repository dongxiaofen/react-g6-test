import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import TableList from './TableList';
function AlertAnalysis({alertAnalysisStore, uiStore}) {
  const len = uiStore.uiState.alertAnalysis.totalElements;
  return (
    <div>
      <ModuleTitle module="预警信息" count={len} />
      <TableList alertAnalysisStore={alertAnalysisStore} />
    </div>
  );
}

AlertAnalysis.propTypes = {
  foo: PropTypes.string,
};
export default inject('alertAnalysisStore', 'uiStore')(observer(AlertAnalysis));
