import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Table({dataSource, columns}) {
  return (
    <div className={styles['table-box']}>
      
    </div>
  );
}

Table.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array,
};
export default observer(Table);
