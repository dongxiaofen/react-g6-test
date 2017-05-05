import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import noImg from 'imgs/noData/noimg.jpg';
import styles from './index.less';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';


function TradeMark({moduleData}) {
  const modifyTrademarkImg = (rowData) => {
    return (
      <div className={styles.img}>
        <img className={styles.iconImg} src={rowData.base64 ? 'data:image/jpg;base64,' + rowData.base64 : noImg} />
      </div>
    );
  };
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="商标"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'TrademarkImg', 'width': '12', handleBlock: modifyTrademarkImg},
      {'key': 'name', 'width': '6'},
      {'key': 'flowStatus', 'width': '6'},
      {'key': 'flowStatusTime', 'width': '6'},
      {'key': 'category', 'width': '6'},
    ],
    item: moduleData,
    dict: 'trademark',
    type: 'array',
    hasConfig: true,
  };
  return (
    <div>
      <SecondTitle module="商标" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

TradeMark.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(TradeMark);
