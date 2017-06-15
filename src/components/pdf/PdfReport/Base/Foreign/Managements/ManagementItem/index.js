import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import styles from './index.less';

function ManagementItem({personData}) {
  console.log(personData, '====================');
  if (!personData || Object.keys(personData).length === 0) {
    return (
      <div>
        <SecondTitle module={personData.name} />
        <PdfNotFound />
      </div>
    );
  }
  const externalPerson = {
    dataConfig: [
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      {'key': 'entType', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      {'key': 'fundedRatio', 'width': '6'},
      {'key': 'subConam', 'width': '6'},
      {'key': 'regCap', 'width': '6'},
      {'key': 'frName', 'width': '6'},
      {'key': 'regNo', 'width': '6'},
      {'key': 'regOrg', 'width': '6'},
    ],
    item: personData.frPositionList,
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };
  const ForeignInvestment = {
    dataConfig: [
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      {'key': 'entType', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      {'key': 'fundedRatio', 'width': '6'},
      {'key': 'subConam', 'width': '6'},
      {'key': 'regCap', 'width': '6'},
      {'key': 'frName', 'width': '6'},
      {'key': 'regNo', 'width': '6'},
      {'key': 'regOrg', 'width': '6'},
    ],
    item: personData.managementInvList,
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };
  const ExternalService = {
    dataConfig: [
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      {'key': 'entType', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      {'key': 'fundedRatio', 'width': '6'},
      {'key': 'subConam', 'width': '6'},
      {'key': 'regCap', 'width': '6'},
      {'key': 'frName', 'width': '6'},
      {'key': 'regNo', 'width': '6'},
      {'key': 'regOrg', 'width': '6'},
    ],
    item: personData.managementPositionList,
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };

  return (
    <div className={styles.management}>
      <SecondTitle module={personData.name} />
      <p>对外担任法人（{personData.frPositionList.length}）</p>
      <PdfSimpleKey {...externalPerson} />
      <p>对外投资（{personData.managementInvList}）</p>
      <PdfSimpleKey {...ForeignInvestment} />
      <p>对外任职（{personData.managementPositionList}）</p>
      <PdfSimpleKey {...ExternalService} />
    </div>
  );
}

ManagementItem.propTypes = {
  foo: PropTypes.string,
};
export default observer(ManagementItem);
