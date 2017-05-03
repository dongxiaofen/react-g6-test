import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Base({}) {
  return (
    <div>

    </div>
  );
}

Base.propTypes = {
  foo: PropTypes.string,
};
export default observer(Base);
