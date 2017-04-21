import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { CardTable } from 'components/common/report';

function Patent({}) {
  return (
    <CardTable />
  );
}

Patent.propTypes = {
  foo: PropTypes.string,
};
export default observer(Patent);
