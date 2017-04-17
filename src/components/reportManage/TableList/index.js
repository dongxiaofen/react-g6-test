import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import BaseList from '../BaseList';
import pathval from 'pathval';

function TableList({ reportManageStore }) {
  return (
  <div>
  {
    pathval.getPathValue(reportManageStore, 'list.data.content') ? pathval.getPathValue(reportManageStore, 'list.data.content').map((item, index) =>
      <BaseList key={`reportManage${index}Id`} listData={item}/>) : ''
  }
  </div>
  );
}

TableList.propTypes = {
  foo: PropTypes.string,
};
export default inject('reportManageStore')(observer(TableList));
