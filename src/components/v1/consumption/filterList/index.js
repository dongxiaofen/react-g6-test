import React, { PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import { Col, Row } from 'components/common/layout';
import Button from 'components/lib/button';
import SelectInput from './filter/selectInput';
import SelectType from './filter/selectType';
// import DateFilte from '../../filter/dateFilte';
import DateFilte from 'components/common/ConsumeDateFilter';
import styles from './index.less';

function FilterList({consumeStore, uiStore}) {
  // const typeData = {}
  const handleSearch = () => {
    if (uiStore.uiState.consumptionPager.index === 1) {
      consumeStore.getConsumptionList();
    } else {
      uiStore.updateUiStore('consumptionPager.index', 1);
    }
  };
  const resetSearchDate = () => {
    const initData = {
      id: '',
      // permissionName: '',
      permissionClassification: '',
      sdkApiRecordParams: '',
      createdTsBegin: '',
      createdTsEnd: '',
    };
    consumeStore.updateValue('consumption.filter', initData);
    consumeStore.updateValue('consumption.mothFilter', '');
    consumeStore.updateValue('consumption.selectInputTarget', 'id');
    // consumeStore.getConsumptionList();
    if (uiStore.uiState.consumptionPager.index === 1) {
      consumeStore.getConsumptionList();
    } else {
      uiStore.updateUiStore('consumptionPager.index', 1);
    }
  };
  return (
    <Row className={styles['filter-list']}>
      <Col className={styles.item} width="6">
        <SelectInput />
      </Col>
      <Col className={styles.item} width="6">
        <div className={styles.right}>
          <DateFilte type="consumption"/>
        </div>
      </Col>
      <Col className={styles.item} width="6">
        <SelectType />
      </Col>
      <Col className={styles.item} width="6">
        <div className={styles.right}>
          <Button className={`${styles['flt-btn']} ${styles.primary}`} btnType="primary" onClick={handleSearch}>搜索</Button>
          <Button className={`${styles['flt-btn']} ${styles.secondary}`} btnType="secondary" onClick={resetSearchDate}>清空</Button>
        </div>
      </Col>
    </Row>
  );
}

FilterList.propTypes = {
  consumeStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default inject('consumeStore', 'uiStore')(observer(FilterList));
