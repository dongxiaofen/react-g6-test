import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import networkType from 'dict/networkType';

function NodeType({ nodeData, mainCompanyName, currentNetwork }) {
  const links = currentNetwork.links;
  let linkData;
  links.map((link) => {
    if ((link.target === mainCompanyName && link.source === nodeData.name) || (link.target === nodeData.name && link.source === mainCompanyName)) {
      linkData = link;
    }
  });

  const getTypeArr = () => {
    const typeArr = [];
    if (nodeData.firstLayer === 0) {
      nodeData.cateList.map((cate) => {
        typeArr.push(<span key={`${cate}`} className={styles.nodeType}>{networkType[networkType.findIndex((item) => item.id === cate)].label + '相关'}</span>);
      });
    } else {
      Object.keys(linkData.name).map((key) => {
        if (key === linkData.name[key].join(',')) {
          typeArr.push(<span key={`${key}`} className={styles.nodeType}>{`${key}`}</span>);
        } else {
          typeArr.push(<span key={`${key}`} className={styles.nodeType}>{`${key}（${linkData.name[key].join(',')}）`}</span>);
        }
      });
    }
    return typeArr;
  };

  const getInvestList = () => {
    let investList;
    if (nodeData.firstLayer === 0) {// 只显示第一层的投资金额和投资比例
      investList = '';
    } else if (nodeData.cateList.indexOf(3) >= 0) {
      const invCurrency = (linkData.invCurrency === '人民币' || linkData.invCurrency === '') ? '万人民币' : linkData.invCurrency;
      if (linkData.invRatio === -1) {
        investList = (
          <div>
            <div className={styles.item}>
              投资金额: 暂无
            </div>
            <div className={styles.item}>
              投资比例: 暂无
            </div>
          </div>
        );
      } else {
        investList = (
          <div>
            <div className={styles.item}>
              投资金额: {linkData.invConum + invCurrency}
            </div>
            <div className={styles.item}>
              投资比例: {linkData.invRatio.toFixed(2) + '%'}
            </div>
          </div>
        );
      }
    } else if (nodeData.cateList.indexOf(4) >= 0) {
      const invCurrency = (linkData.invCurrency === '人民币' || linkData.invCurrency === '') ? '万人民币' : linkData.invCurrency;
      if (linkData.invRatio === -1) {
        investList = (
          <div>
            <div className={styles.item}>
              对外投资金额: 暂无
            </div>
            <div className={styles.item}>
              对外投资比例: 暂无
            </div>
          </div>
        );
      } else {
        investList = (
          <div>
            <div className={styles.item}>
              对外投资金额: {linkData.invConum + invCurrency}
            </div>
            <div className={styles.item}>
              对外投资比例: {linkData.invRatio.toFixed(2) + '%'}
            </div>
          </div>
        );
      }
    }
    return investList;
  };
  return (
    <div>
      <div className={styles.item}>
        {getTypeArr()}
      </div>
      {getInvestList()}
    </div>
  );
}

NodeType.propTypes = {
  foo: PropTypes.string,
};
export default observer(NodeType);
