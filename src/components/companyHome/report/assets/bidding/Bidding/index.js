import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';

function Bidding({}) {
  return (
    <div>
      <ModuleTitle module="招投标信息" />
      test
    </div>
  );
}

Bidding.propTypes = {
  foo: PropTypes.string,
};
export default observer(Bidding);
