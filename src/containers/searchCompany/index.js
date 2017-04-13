import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SearchBar from 'components/searchCompany/SearchBar';
import SearchList from 'components/searchCompany/SearchList';
import { Container, Row, Col } from 'components/common/Layout';
import styles from './index.less';

@observer
export default class SearchCompany extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`${styles.searchWrap}`}>
        <div className={`${styles.searchBarWrap} ${styles.bdWhite}`}>
          <Container>
            <div className={`${styles.searchBarCon}`}>
              <SearchBar />
            </div>
          </Container>
        </div>
        <div className={`${styles.searchListWrap}`}>
          <Container>
            <Row>
              <Col>
                <SearchList />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
