import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import BaseList from '../BaseList';

function TableList({}) {
  return (
    <BaseList/>
  );
}

TableList.propTypes = {
  foo: PropTypes.string,
};
export default observer(TableList);
