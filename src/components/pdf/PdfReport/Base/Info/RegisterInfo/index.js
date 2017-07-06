import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function RegisterInfo({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="注册信息"/>
        <PdfNotFound />
      </div>
    );
  }
  const handleCap = (value, items) => {
    if (!isNaN(parseFloat(value))) {
      return parseFloat(value).toFixed(2) + `${items.regCapCur !== '' ? `万（${items.regCapCur}）` : '万元'}`;
    }
    return '--';
  };
  const date = (value, item) => {
    if (value.length === 0 && item.openTo.length === 0) {
      return '--';
    }
    return `${value.length === 0 ? '--' : value}至${item.openTo.length !== 0 ? item.openTo : '--'}`;
  };
  const handleEnterpriseStatus = (value, items) => {
    let status = '';
    let dates = '';
    if (items.enterpriseStatus === '' || items.enterpriseStatus === undefined) {
      status = '--';
    } else {
      status = items.enterpriseStatus;
    }
    if ((items.cancelDate === '' || items.cancelDate === undefined) && (items.revokeDate === '' || items.revokeDate === undefined)) {
      dates = '';
    }
    if ((items.cancelDate === '' || items.cancelDate === undefined) && items.revokeDate) {
      dates = '（吊销日期：' + items.revokeDate + '）';
    }
    if ((items.revokeDate === '' || items.revokeDate === undefined) && items.cancelDate) {
      dates = '（注销日期：' + items.cancelDate + '）';
    }
    if (items.revokeDate && items.cancelDate) {
      dates = '（' + items.cancelDate + '/' + items.revokeDate + '）';
    }
    // return
    return status + dates;
  };
  const data = {
    dataConfig: [
      {'key': 'enterpriseName', 'width': '6'},
      {'key': 'regNo', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      {'key': 'frName', 'width': '6'},
      {'key': 'regCap', 'width': '6', 'handle': handleCap},
      {'key': 'enterpriseStatus', 'width': '6', 'handle': handleEnterpriseStatus},
      {'key': 'address', 'width': '6'},
      {'key': 'enterpriseType', 'width': '6'},
      {'key': 'regOrg', 'width': '6'},
      // {'key': 'recCap', 'width': '6'},
      {'key': 'openFrom', 'width': '6', 'handle': date},
      {'key': 'operateScope', 'width': '12'},
      // {'key': 'industryPhyName', 'width': '6'},
      // {'key': 'industryName', 'width': '6'},
      // {'key': 'ancheDate', 'width': '6'},
      // {'key': 'cancelDate', 'width': '6'},
      // {'key': 'abuItem', 'width': '6'},
      // {'key': 'cbuItem', 'width': '12'},
    ],
    item: moduleData[0],
    dict: 'RegisterInfo',
    type: 'object',
    hasConfig: true,
  };
  return (
    <div>
      <SecondTitle module="注册信息"/>
      <PdfSimpleKey {...data} />
    </div>
  );
}

RegisterInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default inject('pdfStore')(observer(RegisterInfo));