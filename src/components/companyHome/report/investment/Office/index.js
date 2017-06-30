import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function Office({investmentStore}) {
  const frData = investmentStore.frPositionList;
  const count = frData.content ? frData.content.length : 0;
  const isLoading = frData.content === undefined ? true : false;
  const isError = frData.error;
  const modifyTextNumber = (value) => {
    return Number(value).toFixed(2);
  };
  let frName = '';
  if (count > 0) {
    frName = frData.content[0].name;
  }
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
        { 'key': 'regCap', 'width': '4', 'hide': true, 'modifyText': modifyTextNumber },
        { 'key': 'frName', 'width': '4', 'hide': true },
        { 'key': 'regNo', 'width': '4', 'hide': true },
        { 'key': 'regOrg', 'width': '4', 'hide': true },
      ],
      isExpand: false,
      dict: 'frPositionList',
      cData: frData.content
    },
    isLoading: isLoading,
    module: '法人对外任职',
    error: isError
  };
  return (
    <div>
      <ModuleTitle module={frName ? `法人（${frName}）任职` : '法人任职'} count={count} />
      <CardTable {...data} />
    </div>
  );
}

Office.propTypes = {
  foo: PropTypes.string,
};
export default observer(Office);
