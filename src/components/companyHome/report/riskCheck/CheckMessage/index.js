import React from 'react';
import { observer } from 'mobx-react';
import { CardTable } from 'components/common/report';
function CheckMessage({riskCheckStore}) {
  const checkData = riskCheckStore.checkData;
  const isLoading = checkData.content === undefined ? true : false;
  const data = {
    meta: {
      body: [
        {'key': 'checkDate', 'width': '6'},
        {'key': 'institution', 'width': '6'},
        {'key': 'checkType', 'width': '6', hide: true},
        {'key': 'checkResult', 'width': '6', hide: true}
      ],
      isExpand: false,
      dict: 'checkMessage',
      cData: checkData.content
    },
    module: '经营异常信息',
    isLoading: isLoading,
    error: checkData.error
  };
  return (
    <div>
      <CardTable {...data} />
    </div>
  );
}

export default observer(CheckMessage);
