import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
// import * as svgTools from 'helpers/svgTools';
// import styles from './index.less';

function ListInfo({listConfig}) {
  return (
    <div>
      ListInfo
    </div>
  );
}

ListInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('routing')(observer(ListInfo));
