import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import CommonList from '../CommonList';

function ActiveRules({data}) {
  const config = {
    data,
  };
  return <CommonList {...config} />;
}

ActiveRules.propTypes = {
  foo: PropTypes.object,
};
export default observer(ActiveRules);
