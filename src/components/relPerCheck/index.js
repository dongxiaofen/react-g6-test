import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import CheckList from './CheckList';
import Button from 'components/lib/button';
import CheckModal from './CheckModal';
import { runInAction } from 'mobx';
import { Container, Row, Col } from 'components/common/layout';

function RelPerInfo({relPerCheckStore}) {
  const handleClick = () => {
    runInAction('显示弹窗', () => {
      relPerCheckStore.showCheckModal = true;
    });
  };
  const closeModal = () => {
    runInAction('关闭弹窗', () => {
      relPerCheckStore.showCheckModal = false;
      // 身份证号
      relPerCheckStore.relatedIdCard = '';
      relPerCheckStore.relatedName = '';
      relPerCheckStore.relatedType = '';
      relPerCheckStore.relatedSubmit = false;

      relPerCheckStore.idCardShow = false;
      relPerCheckStore.relationshipShow = false;
      relPerCheckStore.personNameShow = false;
    });
  };
  const checkModalConfig = {
    visible: relPerCheckStore.showCheckModal,
    closeAction: closeModal,
    relPerCheckStore: relPerCheckStore,
    pointText: true,
    btnLoading: relPerCheckStore.isLoading
  };
  return (
  <Container>
    <Row>
      <Col>
        <div className="clearfix">
          <h1 className={styles.title}>个人黑名单</h1>
          <Button btnType="primary" className={styles.noDataButton} onClick={handleClick}>添加个人核查</Button>
          <CheckModal {...checkModalConfig} />
        </div>
        <div className={styles.listArea}>
          <CheckList listData={relPerCheckStore.personCheckInfoData} loading={relPerCheckStore.getDataLoading} />
        </div>
      </Col>
    </Row>
  </Container>
  );
}
RelPerInfo.propTypes = {
  relPerCheckStore: PropTypes.object,
};
export default inject('relPerCheckStore')(observer(RelPerInfo));
