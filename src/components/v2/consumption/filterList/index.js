import React, { PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import { Col, Row } from 'components/common/layout';
import Button from 'components/lib/button';
// import SelectInput from './filter/selectInput';
// import SelectType from './filter/selectType';
import DateFilte from 'components/common/ConsumeDateFilter';
import styles from './index.less';

function FilterList({consumptionStore, uiStore}) {
  // const typeData = {}
  const handleSearch = () => {
    if (uiStore.uiState.consumptionPager.index === 1) {
      consumptionStore.getConsumptionList();
    } else {
      uiStore.updateUiStore('consumptionPager.index', 1);
    }
  };
  const resetSearchDate = () => {
    // const initData = {
    //   id: '',
    //   permissionClassification: '',
    //   sdkApiRecordParams: '',
    //   createdTsBegin: '',
    //   createdTsEnd: '',
    // };
    // consumptionStore.updateValue('consumption.filter', initData);
    // consumptionStore.updateValue('consumption.mothFilter', '');
    // consumptionStore.updateValue('consumption.selectInputTarget', 'id');
    consumptionStore.resertFilter();
    if (uiStore.uiState.consumptionPager.index === 1) {
      consumptionStore.getConsumptionList();
    } else {
      uiStore.updateUiStore('consumptionPager.index', 1);
    }
  };
  return (
    <Row className={styles['filter-list']}>
      {/*<Col className={styles.item} width="6">
        <SelectInput />
      </Col>*/}
      <Col className={styles.item} width="6">
        <div className={styles.right}>
          <DateFilte type="consumption"/>
        </div>
      </Col>
      {/*<Col className={styles.item} width="6">
        <SelectType />
      </Col>*/}
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
  consumptionStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default inject('consumptionStore', 'uiStore')(observer(FilterList));
