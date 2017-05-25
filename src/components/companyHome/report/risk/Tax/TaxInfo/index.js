import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {CardTable} from 'components/common/report';

function TaxInfo({taxList}) {
  const regExecMoney = value => {
    let _value;
    if (isNaN(Number(value))) {
      _value = value;
    } else {
      _value = Number(value).toFixed(0);
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
      cData: taxList
    },
    module: '纳税信用',
    error: taxList.length === 0
  };
  return (
    <div>
      <CardTable {...data} />
    </div>
  );
}

TaxInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(TaxInfo);
