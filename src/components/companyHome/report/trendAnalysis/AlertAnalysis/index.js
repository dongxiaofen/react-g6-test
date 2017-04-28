import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

function AlertAnalysis({}) {
  return (
    <div>
      <a>查看</a>
    </div>
  );
}

AlertAnalysis.propTypes = {
  foo: PropTypes.string,
};
export default observer(AlertAnalysis);
