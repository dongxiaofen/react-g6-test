import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import CommonList from '../CommonList';

function HitRules({data}) {
  const config = {
    data,
  };
  return <CommonList {...config} />;
}

HitRules.propTypes = {
  foo: PropTypes.object,
};
export default observer(HitRules);
