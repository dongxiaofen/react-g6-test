import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import SearchItemLeft from './SearchItemLeft';
import SearchItemRight from './SearchItemRight';
import { Row, Col } from 'components/common/layout';

function SearchItem({itemData, searchParameter, modalStore, singleData}) {
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
            modalStore={modalStore}
            itemData={itemData}
            singleData={singleData} />
        </Col>
      </Row>
    </div>
  );
}

SearchItem.propTypes = {
  itemData: PropTypes.object,
  searchParameter: PropTypes.object,
  modalStore: PropTypes.object,
  singleData: PropTypes.func,
};
export default observer(SearchItem);
