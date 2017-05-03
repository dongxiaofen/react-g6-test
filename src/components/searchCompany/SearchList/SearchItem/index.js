import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import SearchItemLeft from './SearchItemLeft';
import SearchItemRight from './SearchItemRight';
import { Row, Col } from 'components/common/layout';

function SearchItem({itemData, searchParameter, modalStore, payModalStore, singleData, createMonitor, createReportType}) {
  return (
    <div className={`${styles.searchItemWrap}`}>
      <Row>
        <Col width="8">
          <SearchItemLeft
            itemData={itemData}
            searchParameter={searchParameter} />
        </Col>
        <Col width="4">
          <SearchItemRight
            payModalStore={payModalStore}
            modalStore={modalStore}
            itemData={itemData}
            singleData={singleData}
            createMonitor={createMonitor}
            createReportType={createReportType} />
        </Col>
      </Row>
    </div>
  );
}

SearchItem.propTypes = {
  itemData: PropTypes.object,
  searchParameter: PropTypes.object,
  modalStore: PropTypes.object,
  payModalStore: PropTypes.object,
  singleData: PropTypes.func,
  createMonitor: PropTypes.func,
  createReportType: PropTypes.func,
};
export default observer(SearchItem);
