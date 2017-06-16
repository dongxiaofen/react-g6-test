import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import styles from './index.less';

function ManagementItem({personData}) {
  const parseObject = (data) => {
    let newArr = [];
    data.map( (item) => {
      Object.keys(item).map( (key) => {
        if (item[key] !== '' && !isNaN(item[key])) {
          item[key] = parseFloat(item[key]).toFixed(2);
        }
      });
      newArr = [...newArr, item];
    });
    return newArr;
  };
  if (!personData || Object.keys(personData).length === 0) {
    return (
      <div>
        <div style={{marginTop: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  const externalPerson = {
    dataConfig: [
      // {'key': 'entName', 'width': '6'},
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      {'key': 'regCap', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      // {'key': 'regCap', 'width': '6'},
      // {'key': 'frName', 'width': '6'},
      // {'key': 'regNo', 'width': '6'},
      // {'key': 'regOrg', 'width': '6'},
    ],
    item: parseObject(personData.frPositionList),
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };
  const ForeignInvestment = {
    dataConfig: [
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      // {'key': 'entType', 'width': '6'},
      {'key': 'subConam', 'width': '6'},
      {'key': 'fundedRatio', 'width': '6'},
      {'key': 'regCap', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      // {'key': 'frName', 'width': '6'},
      // {'key': 'regNo', 'width': '6'},
      // {'key': 'regOrg', 'width': '6'},
    ],
    item: parseObject(personData.managementInvList),
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };
  const ExternalService = {
    dataConfig: [
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      // {'key': 'entType', 'width': '6'},
      {'key': 'subConam', 'width': '6'},
      // {'key': 'fundedRatio', 'width': '6'},
      {'key': 'regCap', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      // {'key': 'frName', 'width': '6'},
      // {'key': 'regNo', 'width': '6'},
      // {'key': 'regOrg', 'width': '6'},
    ],
    item: parseObject(personData.managementPositionList),
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };

  return (
    <div className={styles.management}>
      <SecondTitle module={`${personData.name}（${personData.positions.join(',')}）`} />
      <p>对外担任法人（{personData.frPositionList.length}）</p>
      <PdfSimpleKey {...externalPerson} />
      <p>对外投资（{personData.managementInvList.length}）</p>
      <PdfSimpleKey {...ForeignInvestment} />
      <p>对外任职（{personData.managementPositionList.length}）</p>
      <PdfSimpleKey {...ExternalService} />
    </div>
  );
}

ManagementItem.propTypes = {
  personData: PropTypes.object,
};
export default observer(ManagementItem);
