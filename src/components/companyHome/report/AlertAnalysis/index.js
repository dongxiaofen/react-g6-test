import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import TableList from './TableList';
function AlertAnalysis({alertAnalysisStore}) {
  const len = alertAnalysisStore.listData.totalElements;
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
export default inject('alertAnalysisStore')(observer(AlertAnalysis));
