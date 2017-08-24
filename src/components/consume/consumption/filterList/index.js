import React from 'react';
import {observer, inject} from 'mobx-react';
import { Col, Row } from 'components/common/layout';
import Button from 'components/lib/button';
import SelectInput from '../../filter/selectInput';
import SelectType from '../../filter/selectType';
import DateFilte from '../../filter/dateFilte';
import styles from './index.less';

function FilterList({consumeStore}) {
  // const typeData = {}
  const handleSearch = () => {
    consumeStore.getConsumptionList();
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
    consumeStore.updateValue('consumption.selectInputTarget', 'id');
    consumeStore.getConsumptionList();
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
          <Button className={styles['flt-btn']} btnType="primary" onClick={handleSearch}>筛选</Button>
          <Button className={styles['flt-btn']} btnType="secondary" onClick={resetSearchDate}>清空</Button>
        </div>
      </Col>
    </Row>
  );
}

// FilterList.propTypes = {
//   consumeStore: PropTypes.object,
// };
export default inject('consumeStore')(observer(FilterList));
