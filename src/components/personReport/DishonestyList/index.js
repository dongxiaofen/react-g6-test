import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import DishonestyBody from './DishonestyBody';

function DishonestyList({dishonestyList, loading}) {
  return (
    <div>
      <ModuleTitle module={`失信被执行人信息（${dishonestyList ? dishonestyList.length : 0}）`} />
      <DishonestyBody isLoading= {loading}
                      dishonestyList= {dishonestyList}
                      error= {dishonestyList === undefined}
                      module="失信被执行人信息" />
    </div>
  );
}

DishonestyList.propTypes = {
  dishonestyList: PropTypes.object,
  loading: PropTypes.bool,
};
export default observer(DishonestyList);
