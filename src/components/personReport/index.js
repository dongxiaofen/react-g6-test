import React, {PropTypes, Component} from 'react';
import { observer, inject } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import Banner from './Banner';
import PersonBlackList from './PersonBlackList';
import Executed from './Executed';
import DishonestyList from './DishonestyList';
import styles from './index.less';

@inject('personReportStore', 'routing')
@observer
export default class PersonReportBody extends Component {
  static propTypes = {
    routing: PropTypes.object,
    personReportStore: PropTypes.object,
  }
  constructor() {
    super();
  }
  componentDidMount() {
    const { personCheckId } = this.props.routing.location.query;
    this.params = {
      personCheckId,
    };
    this.props.personReportStore.getDetailInfo(this.params);
  }
  render() {
    const {personReportStore} = this.props;
    return (
      <Container>
        <Row>
          <Col width="12">
            <Banner personReportStore={personReportStore} params={this.params} />
          </Col>
        </Row>
        <Row className={styles.marginTop20}>
          <Col width="12">
            <div className={`clearfix ${styles.wrap}`}>
              <div className={styles.boxItem}>
                <PersonBlackList personBlacklist={personReportStore.blacklistData} isLoading={personReportStore.isLoading} />
              </div>
            </div>
            <div className={`clearfix ${styles.wrap}`}>
              <div className={styles.boxItem}>
                <Executed executedData={personReportStore.executed} isLoading={personReportStore.isLoading} />
              </div>
            </div>
            <div className={`clearfix ${styles.wrap}`}>
              <div className={styles.boxItem}>
                <DishonestyList dishonestyList={personReportStore.dishonestyList} isLoading={personReportStore.isLoading} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

