import React from 'react';
import { observer } from 'mobx-react';
import { CardTable } from 'components/common/report';
function AbnormalOperation({riskCheckStore}) {
  const abnormalData = riskCheckStore.abnormalData;
  const isLoading = abnormalData.content === undefined ? true : false;
  const data = {
    meta: {
      body: [
        {'key': 'abntime', 'width': '6'},
        {'key': 'retime', 'width': '6'},
        {'key': 'specause', 'width': '6', hide: true},
        {'key': 'recause', 'width': '6', hide: true},
        {'key': 'decorg', 'width': '12', hide: true},
      ],
      isExpand: false,
      dict: 'jyErrorData',
      cData: abnormalData.content
    },
    module: '经营异常信息',
    isLoading: isLoading,
    error: abnormalData.error
  };
  return (
    <div>
      <CardTable {...data} />
    </div>
  );
}

export default observer(AbnormalOperation);
