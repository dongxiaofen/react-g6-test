import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable} from 'components/common/report';

function CheckMessage({checkMessage}) {
  const data = {
    meta: {
      body: [
        {'key': 'check_date', 'width': '6'},
        {'key': 'institution', 'width': '6'},
        {'key': 'check_type', 'width': '6', hide: true},
        {'key': 'check_result', 'width': '6', hide: true}
      ],
      isExpand: false,
      dict: 'checkMessage',
      cData: checkMessage
    },
    module: '经营异常信息',
    error: checkMessage.length === 0
  };
  return (
    <div>
      <ModuleTitle module="抽查检查信息"/>
      <CardTable {...data} />
    </div>
  );
}

CheckMessage.propTypes = {
  foo: PropTypes.string,
};
export default observer(CheckMessage);
