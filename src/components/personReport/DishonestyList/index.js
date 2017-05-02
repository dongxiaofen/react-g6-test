import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import Pager from 'components/common/Pager';
import BlackSingleList from './BlackSingleList';

function DishonestyList({dishonestyList, uiStore}) {
  const {index, size } = uiStore.uiState.dishonesty;
  const dishonestyListData = dishonestyList.slice((index - 1) * size, index * size);
  return (
    <div>
      <ModuleTitle module={`失信被执行人信息（${dishonestyList ? dishonestyList.length : 0}）`} />
      {
        dishonestyListData ? dishonestyListData.map((item, numbers) => <BlackSingleList listData={item} key={`blackList${numbers}`} index={numbers + 1} />) : ''
      }
      <Pager uiStore={uiStore} type="small" module="dishonesty" tData={dishonestyList} />
    </div>
  );
}

DishonestyList.propTypes = {
  foo: PropTypes.string,
};
export default inject('uiStore')(observer(DishonestyList));
