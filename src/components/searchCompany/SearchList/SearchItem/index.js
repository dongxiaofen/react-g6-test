import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import SearchItemLeft from './SearchItemLeft';
import SearchItemRight from './SearchItemRight';
import { Row, Col } from 'components/common/Layout';

function SearchItem({itemData}) {
  return (
    <div className={`${styles.searchItemWrap}`}>
      <Row>
        <Col width="8">
          <SearchItemLeft itemData={itemData} />
        </Col>
        <Col width="4">
          <SearchItemRight itemData={itemData} />
        </Col>
      </Row>
    </div>
  );
}

SearchItem.propTypes = {
  itemData: PropTypes.object,
};
export default observer(SearchItem);
