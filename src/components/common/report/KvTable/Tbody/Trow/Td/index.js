import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Td({position, type, value}) {
  let tdWidth;
  if (type === 'half') {
    tdWidth = position === 'left' ? '12%' : '40%';
  }else {
    tdWidth = position === 'left' ? '12%' : '90%';
  }
  return (
    <td className={styles[position]} colSpan={type === 'full' && position === 'right' ? '3' : '1'} style={{width: tdWidth}}>{`${value}${position === 'left' ? ':' : ''}`}</td>
  );
}

Td.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired
};
export default observer(Td);
