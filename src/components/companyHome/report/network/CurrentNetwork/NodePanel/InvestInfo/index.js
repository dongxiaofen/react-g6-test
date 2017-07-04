import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { Row, Col } from 'components/common/layout';
function InvestInfo({ nodeData, mainCompanyName, currentNetwork }) {
  const links = currentNetwork.links;
  let linkData;
  links.map((link) => {
    if ((link.target === mainCompanyName && link.source === nodeData.name) || (link.target === nodeData.name && link.source === mainCompanyName)) {
      linkData = link;
    }
  });
  const getInvestList = () => {
    let investList = '';
    if (nodeData.firstLayer === 0) {// 只显示第一层的投资金额和投资比例
      investList = '';
    } else if (nodeData.cateList.indexOf(3) >= 0) {
      const invCurrency = (linkData.invCurrency === '人民币' || linkData.invCurrency === '') ? '万人民币' : linkData.invCurrency;
      if (linkData.invRatio === -1) {
        investList = (
          <div>
            <Row className={styles.box}>
              <Col width="4">投资金额:</Col>
              <Col width="8">暂无</Col>
            </Row>
            <Row className={styles.box}>
              <Col width="4">投资比例:</Col>
              <Col width="8">暂无</Col>
            </Row>
          </div>
        );
      } else {
        investList = (
          <div>
            <Row className={styles.box}>
              <Col width="4">投资金额:</Col>
              <Col width="8">{linkData.invConum + invCurrency}</Col>
            </Row>
            <Row className={styles.box}>
              <Col width="4">投资比例:</Col>
              <Col width="8">{linkData.invRatio.toFixed(2) + '%'}</Col>
            </Row>
          </div>
        );
      }
    } else if (nodeData.cateList.indexOf(4) >= 0) {
      const invCurrency = (linkData.invCurrency === '人民币' || linkData.invCurrency === '') ? '万人民币' : linkData.invCurrency;
      if (linkData.invRatio === -1) {
        investList = (
          <div>
            <Row className={styles.box}>
              <Col width="4">投资金额:</Col>
              <Col width="8">暂无</Col>
            </Row>
            <Row className={styles.box}>
              <Col width="4">投资比例:</Col>
              <Col width="8">暂无</Col>
            </Row>
          </div>
        );
      } else {
        investList = (
          <div>
            <Row className={styles.box}>
              <Col width="4">投资金额:</Col>
              <Col width="8">{linkData.invConum + invCurrency}</Col>
            </Row>
            <Row className={styles.box}>
              <Col width="4">投资比例:</Col>
              <Col width="8">{linkData.invRatio.toFixed(2) + '%'}</Col>
            </Row>
          </div>
        );
      }
    }
    return investList;
  };
  return (
    <div>
      {getInvestList()}
    </div>
  );
}

InvestInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(InvestInfo);
