import React, { PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import { Col, Row } from 'components/common/layout';
import Button from 'components/lib/button';
// import SelectInput from './filter/selectInput';
import SelectType from './filter/selectType';
import SelectDate from './filter/selectDate';
import styles from './index.less';

function FilterList({consumptionStore, uiStore}) {
  const handleSearch = () => {
    if (uiStore.uiState.consumptionV2Pager.index === 1) {
      consumptionStore.getConsumptionList();
    } else {
      uiStore.updateUiStore('consumptionV2Pager.index', 1);
    }
  };
  const resetSearchDate = () => {
    consumptionStore.resertFilter();
    if (uiStore.uiState.consumptionV2Pager.index === 1) {
      consumptionStore.getConsumptionList();
    } else {
      uiStore.updateUiStore('consumptionV2Pager.index', 1);
    }
  };
  return (
    <Row className={styles['filter-list']}>
      <Col className={styles.item} width="4">
        <SelectType />
      </Col>
      <Col className={styles.item} width="6">
        <div>
          <SelectDate />
        </div>
      </Col>
      <Col className={styles.item} width="2">
        <div className={styles.right}>
          <Button className={`${styles['flt-btn']} ${styles.primary}`} btnType="primary" onClick={handleSearch}>搜索</Button>
          <Button className={`${styles['flt-btn']} ${styles.secondary}`} btnType="secondary" onClick={resetSearchDate}>清空</Button>
        </div>
      </Col>
    </Row>
  );
}

FilterList.propTypes = {
  consumptionStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default inject('consumptionStore', 'uiStore')(observer(FilterList));
