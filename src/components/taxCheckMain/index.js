import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import TaxCheckList from './TaxCheckList';
import { Container, Row, Col } from 'components/common/layout';
import Button from 'components/lib/button';
import { runInAction } from 'mobx';

function TaxCheckMain({ modalStore, messageStore, taxCheckStore }) {
  const showAddTaxCheck = () => {
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
        let errorMsg = '';
        taxCheckStore.selectConf.forEach((item, idx) => {
          if (item.input === '') {
            taxCheckStore.changeValue(`selectConf[${idx}].msg`, '金额不能为空');
            errorMsg = '金额不能为空';
          }
          if (item.msg) {
            errorMsg = item.msg;
          }
        });
        if (!taxCheckStore.companyName) {
          errorMsg = '公司名称不能为空';
        }
        if (errorMsg) {
          messageStore.openMessage({
            type: 'error',
            content: errorMsg,
          });
          return false;
        }
        const selectNoMsg = taxCheckStore.selectConf.every(item => item.msg === '');
        if (selectNoMsg) {
          runInAction(() => {
            modalStore.confirmLoading = true;
            taxCheckStore.postSelectInfo();
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
  const handleAddTaxCheckClick = () => {
    showAddTaxCheck();
    this.props.taxCheckStore.changeValue('companyName', '');
    this.props.taxCheckStore.changeValue('isLockCompanyName', false);
  };
  return (
    <Container>
      <Row>
        <Col>
          <div className="clearfix">
            <h1 className={styles.title}>企业年度报税</h1>
            <Button btnType="primary" className={styles.noDataButton} onClick={handleAddTaxCheckClick}>添加企业核查</Button>
          </div>
          <div className={styles.listArea}>
            <TaxCheckList showAddTaxCheck={showAddTaxCheck} loading={taxCheckStore.loading} listData={taxCheckStore.taxListData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

TaxCheckMain.propTypes = {
  foo: PropTypes.string,
};
export default inject('modalStore', 'messageStore', 'taxCheckStore')(observer(TaxCheckMain));
