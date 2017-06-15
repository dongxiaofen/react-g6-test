import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import networkType from 'dict/networkType';
import {Row, Col} from 'components/common/layout';
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
        typeArr.push(networkType[networkType.findIndex((item) => item.id === cate)].label + '相关');
      });
    } else {
      Object.keys(linkData.name).map((key) => {
        if (key === linkData.name[key].join(',')) {
          typeArr.push(`${key}`);
        } else {
          typeArr.push(`${key}(${linkData.name[key].join(',')})`);
        }
      });
    }
    return typeArr.join('/');
  };
  return (
    <Row className={styles.box}>
      <Col width="4">关联关系:</Col>
      <Col width="8">{getTypeArr()}</Col>
    </Row>
  );
}

NodeType.propTypes = {
  foo: PropTypes.string,
};
export default observer(NodeType);
