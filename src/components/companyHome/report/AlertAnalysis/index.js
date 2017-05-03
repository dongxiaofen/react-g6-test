import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';

function AlertAnalysis({alertAnalysisStore}) {
  return (
    <div>
      <a onClick={alertAnalysisStore.openDetailModal}>查看</a>
    </div>
  );
}

AlertAnalysis.propTypes = {
  foo: PropTypes.string,
};
export default inject('alertAnalysisStore')(observer(AlertAnalysis));
