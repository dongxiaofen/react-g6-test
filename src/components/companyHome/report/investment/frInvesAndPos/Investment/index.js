import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
// import styles from './index.less';
import SimpleTable from 'components/common/report/SimpleTable';

function Investment({investmentStore}) {
  const frData = investmentStore.frinvList;
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
      body: [
        [{ 'key': 'entName', 'colSpan': '1'}, {'key': 'entStatus', 'colSpan': '1'}],
        [{ 'key': 'subConam', 'width': '4', 'modifyBlock': modifyTextNumber}, {'key': 'fundedRatio', 'width': '4' }],
        [{ 'key': 'regCap', 'width': '4', 'modifyBlock': modifyTextNumber}, {'key': 'esDate', 'width': '4' }]
      ],
      dict: 'frinvList',
      items: frData.content,
      maxCols: 2,
      hasNumber: true,
      cData: frData.conten,
      isLoading: isLoading,
      module: '法人对外投资',
      error: isError
    },
  };
  return (
    <div>
      <ModuleTitle module={frName ? `（${frName}）投资的企业` : '法人投资的企业'} count={count} />
      <SimpleTable {...data} module="frInvest"/>
    </div>
  );
}

Investment.propTypes = {
  foo: PropTypes.string,
};
export default observer(Investment);
