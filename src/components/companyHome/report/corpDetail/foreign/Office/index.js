import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function Office({ frPositionList, isLoading }) {
  const data = {
    meta: {
      title: {
        main: 'entName',
        sub: ['entStatus', 'entType']
      },
      body: [
        { 'key': 'esDate', 'width': '4' },
        { 'key': 'position', 'width': '4' },
        { 'key': 'lerepsign', 'width': '4' },
        { 'key': 'regCap', 'width': '4', 'hide': true },
        { 'key': 'frName', 'width': '4', 'hide': true },
        { 'key': 'regNo', 'width': '4', 'hide': true },
        { 'key': 'regOrg', 'width': '4', 'hide': true },
      ],
      isExpand: false,
      dict: 'frPositionList',
      cData: frPositionList
    },
    isLoading: isLoading,
    module: '法人对外任职',
    error: frPositionList.length === 0
  };
  return (
    <div>
      <ModuleTitle module="法人对外任职" count={frPositionList.length} />
      <CardTable {...data} />
    </div>
  );
}

Office.propTypes = {
  foo: PropTypes.string,
};
export default observer(Office);
