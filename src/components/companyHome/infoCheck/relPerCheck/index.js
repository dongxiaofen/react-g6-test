import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import CheckList from './CheckList';
import Button from 'components/lib/button';
import noData from 'imgs/personCheck/personNoData.png';
import CheckModal from './CheckModal';
import { runInAction } from 'mobx';

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
  if (relPerCheckStore.personCheckInfoData && relPerCheckStore.personCheckInfoData.length > 0) {
    return (
    <div>
      <Button className={styles.noDataButton} onClick={handleClick}>添加核查</Button>
      <CheckModal {...checkModalConfig} />
      <CheckList listData={relPerCheckStore.personCheckInfoData} />
    </div>
    );
  }
  return (
    <div className={styles.noData}>
      <img className={styles.img} src={noData} />
      <div className={styles.noDataInfo}>还没有关联人核查结果，请添加核查</div>
      <Button className={styles.noDataButton} onClick={handleClick}>添加核查</Button>
      <CheckModal {...checkModalConfig} />
    </div>
  );
}
RelPerInfo.propTypes = {
  relPerCheckStore: PropTypes.object,
};
export default inject('relPerCheckStore')(observer(RelPerInfo));
