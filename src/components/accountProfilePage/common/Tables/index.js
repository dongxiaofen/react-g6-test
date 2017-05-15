import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import TableHead from './TableHead';
import TableBody from './TableBody';

function Tables({}) {
  return (
    <div>
      <TableHead />
      <TableBody />
    </div>
  );
}

Tables.propTypes = {
  foo: PropTypes.string,
};
export default observer(Tables);
