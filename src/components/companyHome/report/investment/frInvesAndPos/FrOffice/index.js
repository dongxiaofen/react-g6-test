import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle} from 'components/common/report';
// import styles from './index.less';
import SimpleTable from 'components/common/report/SimpleTable';
function FrOffice({investmentStore}) {
  const frData = investmentStore.frPositionList;
  const count = frData.content ? frData.content.length : 0;
  const isLoading = frData.content === undefined ? true : false;
  const isError = frData.error;
  const modifyTextNumber = (value) => {
    if (value) {
      return Number(value).toFixed(2) === '0.00' ? '--' : Number(value).toFixed(2);
    }
    return '--';
  };
  let frName = '';
  if (count > 0) {
    frName = frData.content[0].name;
  }
  const data = {
    meta: {
      body: [
        [{ 'key': 'entName', 'colSpan': '1' }, { 'key': 'entStatus', 'colSpan': '1'}],
        [{'key': 'regCap', 'colSpan': '1', 'hide': true, 'modifyBlock': modifyTextNumber }, { 'key': 'esDate', 'colSpan': '2'}],
      ],
      dict: 'frPositionList',
      items: frData.content,
      maxCols: 2,
      hasNumber: true,
      isLoading: isLoading,
      module: '法人对外任职',
      error: isError
    },
  };
  return (
    <div>
      <ModuleTitle module={frName ? `（${frName}）担任法人的企业` : '担任法人的企业'} count={count} />
      <SimpleTable meta={data.meta} module="frPositionList"/>
    </div>
  );
}

FrOffice.propTypes = {
  foo: PropTypes.string,
};
export default observer(FrOffice);
