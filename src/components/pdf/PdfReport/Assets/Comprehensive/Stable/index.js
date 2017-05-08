import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

function Stable({}) {
  return (
    <div>

    </div>
  );
}

Stable.propTypes = {
  foo: PropTypes.string,
};
export default observer(Stable);
