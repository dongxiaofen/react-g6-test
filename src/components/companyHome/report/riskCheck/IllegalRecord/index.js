import React from 'react';
import { observer } from 'mobx-react';
import { CardTable } from 'components/common/report';
function IllegalRecord({riskCheckStore}) {
  const punishData = riskCheckStore.punishData;
  const isLoading = punishData.content === undefined ? true : false;
  const data = {
    meta: {
      body: [
        {'key': 'illegalIncome', 'width': '6'},
        {'key': 'penaltyDate', 'width': '6'},
        {'key': 'isCancel', 'width': '6'},
        {'key': 'penaltyAmount', 'width': '6'},
        {'key': 'ForfeitureAmount', 'width': '6'},
        {'key': 'changeAmount', 'width': '6'},
        {'key': 'lawsuit', 'width': '6', hide: true},
        {'key': 'reconsideration', 'width': '6', hide: true},
        {'key': 'transferJudicialOrg', 'width': '6', hide: true},
        {'key': 'illegalActivities', 'width': '12', hide: true},
        {'key': 'punishmentExecution', 'width': '12', hide: true},
        {'key': 'punishmentBasis', 'width': '12', hide: true},
        {'key': 'illegalFacts', 'width': '12', hide: true},
      ],
      isExpand: false,
      dict: 'illegalRecord',
      cData: punishData.content
    },
    module: '违法记录',
    isLoading: isLoading,
    error: punishData.error
  };
  return (
    <div>
      <CardTable {...data} />
    </div>
  );
}

export default observer(IllegalRecord);
