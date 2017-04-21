import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { CardTable } from 'components/common/report';
import { ModuleTitle } from 'components/common/report';

function Patent({}) {
  return (
    <div>
      <ModuleTitle module="专利信息" />
      <CardTable />
    </div>
  );
}

Patent.propTypes = {
  foo: PropTypes.string,
};
export default observer(Patent);
