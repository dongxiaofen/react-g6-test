import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { Col, Row } from 'components/common/layout';
import styles from './index.less';

function Info({clientStore}) {
  const createInfo = () => {
    const dataArr = [
      {key: 'email', label: '账号'},
      {key: 'accountBalance', label: '剩余点数'},
      {key: 'contactEmail', label: '常用邮箱'},
      {key: 'companyName', label: '公司'},
      {key: 'contact', label: '联系人'},
      {key: 'phone', label: '联系电话'},
    ];
    return dataArr.map(({key, label}, idx) => (<Col key={idx} width="4" className={styles['info-item']}><span className={styles.title}>{ label + '：'}</span><span className={styles.text}>{clientStore.userInfo[key] || '--'}</span></Col>));
  };
  return (
    <Row className={styles.info}>{createInfo()}</Row>
  );
}

Info.propTypes = {
  clientStore: PropTypes.object,
};
export default inject('clientStore')(observer(Info));
