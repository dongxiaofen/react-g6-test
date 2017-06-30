import React from 'react';
import { observer } from 'mobx-react';
import { CardTable, ModuleTitle } from 'components/common/report';

function TaxInfo({riskTaxStore}) {
  const taxData = riskTaxStore.taxData;
  const isLoading = taxData.content === undefined ? true : false;
  const isError = taxData.error;
  const regExecMoney = value => {
    let _value;
    if (isNaN(Number(value))) {
      _value = value;
    } else {
      _value = Number(value).toFixed(2);
    }
    return _value;
  };
  const data = {
    meta: {
      body: [
        {'key': 'blackType', 'width': '6'},
        {'key': 'evalDate', 'width': '6'},
        {'key': 'taxOrg', 'width': '6', hide: true},
        {'key': 'taxOrgType', 'width': '6', hide: true},
        {'key': 'areaName', 'width': '6', hide: true},
        {'key': 'managerOrg', 'width': '6', hide: true},
        {'key': 'taxType', 'width': '6', hide: true},
        {'key': 'taxSum', 'width': '6', 'modifyText': regExecMoney, hide: true},
        {'key': 'isOwingTax', 'width': '6', hide: true},
        {'key': 'illegal', 'width': '6', hide: true},
        {'key': 'evalReason', 'width': '6', hide: true},
        {'key': 'financeName', 'width': '6', hide: true},
        {'key': 'financeCardNo', 'width': '6', hide: true},
        {'key': 'address', 'width': '6', hide: true},
        {'key': 'contactPhone', 'width': '6', hide: true},
      ],
      isExpand: false,
      dict: 'taxPublicInfo',
      cData: taxData.content
    },
    isLoading: isLoading,
    module: '纳税公告',
    error: isError
  };
  return (
    <div>
      <ModuleTitle module="纳税公告" />
      <CardTable {...data} />
    </div>
  );
}

export default observer(TaxInfo);
