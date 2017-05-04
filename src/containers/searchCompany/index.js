import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import SearchBar from 'components/searchCompany/SearchBar';
import SearchBarTop from 'components/searchCompany/SearchBarTop';
import SearchList from 'components/searchCompany/SearchList';
import { Container, Row, Col } from 'components/common/layout';
import styles from './index.less';
@inject('searchCompanyStore')
@observer
export default class SearchCompany extends Component {
  static propTypes = {
    searchCompanyStore: PropTypes.object,
  }
  componentWillUnmount() {
    this.props.searchCompanyStore.resetData();
  }
  render() {
    let searchBarDom = '';
    let topStyle = styles.top;
    let searchList = '';
    if (this.props.searchCompanyStore.isShowResult) {
      topStyle = '';
      searchList = (
        <div className={`${styles.searchListWrap}`}>
          <Container>
            <Row>
              <Col>
                <SearchList />
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      searchBarDom = (
        <div className={`${styles.searchBarWrap} ${styles.bdWhite}`}>
          <Container>
            <div className={`${styles.searchBarCon}`}>
              <SearchBar />
            </div>
          </Container>
        </div>
      );
    }
    return (
      <div className={`${styles.searchWrap}`}>
        <div className={`${styles.searchBarWrapTop} ${styles.bdWhite}  ${topStyle}`}>
          <Container>
            <div className={`${styles.searchBarCon}`}>
              <SearchBarTop />
            </div>
          </Container>
        </div>
        {searchBarDom}
        {searchList}
      </div>
    );
  }
}
