import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import TaxCheckList from './TaxCheckList';
import { Container, Row, Col } from 'components/common/layout';
import Button from 'components/lib/button';
import { runInAction } from 'mobx';

function TaxCheckMain({ modalStore, taxCheckStore, routing }) {
  const handleClick = () => {
    this.props.modalStore.openCompModal({
      title: '企业税务核查',
      width: '695px',
      isSingleBtn: true,
      confirmText: '确定',
      confirmWidth: 280,
      pointText: true,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./TaxCheckModal'));
        }, 'TaxCheckModal');
      },
      confirmAction: () => {
        taxCheckStore.selectConf.forEach((item, idx) => {
          if (item.input === '') {
            taxCheckStore.changeValue(`selectConf[${idx}].msg`, '金额不能为空');
          }
        });
        const selectNoMsg = taxCheckStore.selectConf.every(item => item.msg === '');
        if (selectNoMsg) {
          runInAction(() => {
            const { monitorId, reportId } = routing.location.query;
            modalStore.confirmLoading = true;
            taxCheckStore.postSelectInfo(monitorId, reportId);
          });
        }
      },
      closeAction: () => {
        taxCheckStore.resetSelectModal();
        runInAction(() => {
          modalStore.confirmLoading = false;
          modalStore.visible = false;
        });
      }
    });
  };
  return (
    <Container>
      <Row>
        <Col>
          <div className="clearfix">
            <h1 className={styles.title}>企业年度报税</h1>
            <Button btnType="primary" className={styles.noDataButton} onClick={handleClick}>添加企业核查</Button>
            {/* <CheckModal {...checkModalConfig} /> */}
          </div>
          <div className={styles.listArea}>
            <TaxCheckList />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

TaxCheckMain.propTypes = {
  foo: PropTypes.string,
};
export default inject('modalStore', 'taxCheckStore', 'routing')(observer(TaxCheckMain));
