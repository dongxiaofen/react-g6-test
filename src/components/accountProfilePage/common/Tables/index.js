import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import TableHead from './TableHead';
import TableBody from './TableBody';

function Tables({className}) {
  return (
    <div className={`${className} ${styles.table_box}`}>
      <TableHead />
      <TableBody />
    </div>
  );
}

Tables.propTypes = {
  className: PropTypes.string,
};
export default observer(Tables);
