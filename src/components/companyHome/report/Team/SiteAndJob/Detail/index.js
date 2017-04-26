import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function Detail({}) {
  return (
    <div>
      this is Detail
    </div>
  );
}

Detail.propTypes = {
  foo: PropTypes.string,
};
export default observer(Detail);
