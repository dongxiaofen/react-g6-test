import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import TableHead from './TableHead';
import TableBody from './TableBody';

function Tables({className, config}) {
  return (
    <div className={`${className} ${styles.table_box}`}>
      <TableHead {...config} />
      <div className={`${config.isLoading || config.error ? styles.mTop : styles.item_body_box}`}>
        <TableBody {...config} />
      </div>
    </div>
  );
}

Tables.propTypes = {
  className: PropTypes.string,
};
export default observer(Tables);
