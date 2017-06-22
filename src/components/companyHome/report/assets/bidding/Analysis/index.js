import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report/';

function Analysis({}) {
  return (
    <div>
      <ModuleTitle module="招投标分析图" />
      惺惺惜惺惺
    </div>
  );
}

Analysis.propTypes = {
  foo: PropTypes.string,
};
export default observer(Analysis);
