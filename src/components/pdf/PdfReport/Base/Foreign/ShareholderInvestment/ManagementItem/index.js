import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import styles from './index.less';

function ManagementItem({shareHolderData}) {
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
  if (!shareHolderData || Object.keys(shareHolderData).length === 0) {
    return (
      <div>
        <div style={{marginTop: '30px'}}></div>
        2323
        <PdfNotFound />
      </div>
    );
  }
  const shareHolderPositionFrList = {
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
    item: parseObject(shareHolderData.shareHolderPositionFrList),
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };
  const shareHolderInvList = {
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
    item: parseObject(shareHolderData.shareHolderInvList),
    dict: 'frinvList',
    hasConfig: true,
    type: 'array',
  };
  const shareHolderPositionList = {
    dataConfig: [
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      // {'key': 'entType', 'width': '6'},
      {'key': 'otherPosition', 'width': '6'},
      // {'key': 'fundedRatio', 'width': '6'},
      {'key': 'regCap', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      // {'key': 'frName', 'width': '6'},
      // {'key': 'regNo', 'width': '6'},
      // {'key': 'regOrg', 'width': '6'},
    ],
    item: parseObject(shareHolderData.shareHolderPositionList),
    dict: 'frinvListPdf',
    hasConfig: true,
    type: 'array',
  };

  return (
    <div className={styles.share_holder_management}>
      <SecondTitle module={`${shareHolderData.name}`} />
      <p>对外担任法人代表（{shareHolderData.shareHolderPositionFrList.length}）</p>
      <PdfSimpleKey {...shareHolderPositionFrList} />
      <p>对外投资（{shareHolderData.shareHolderInvList.length}）</p>
      <PdfSimpleKey {...shareHolderInvList} />
      <p>对外任职（{shareHolderData.shareHolderPositionList.length}）</p>
      <PdfSimpleKey {...shareHolderPositionList} />
    </div>
  );
}

ManagementItem.propTypes = {
  shareHolderData: PropTypes.object,
};
export default observer(ManagementItem);
