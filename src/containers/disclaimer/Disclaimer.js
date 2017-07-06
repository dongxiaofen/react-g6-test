import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import styles from './index.less';
import {Container, Row, Col} from 'components/common/layout';
import ProtocolNavbar from 'components/common/ProtocolNavbar';
import DxDisclaimer from 'components/common/DxDisclaimer';
import XxDisclaimer from 'components/common/XxDisclaimer';

@inject('clientStore')
@observer
export default class Disclaimer extends Component {
  static propTypes = {
    clientStore: PropTypes.object,
  }

  render() {
    let disclaimer = '';
    switch (this.props.clientStore.envConfig) {
      case 'cfca_prod':
        disclaimer = (<DxDisclaimer/>);
        break;
      default:
        disclaimer = (<XxDisclaimer/>);
    }
    return (
      <div className={styles.bg}>
        <ProtocolNavbar />
        <Container>
          <Row>
            <Col>
              {disclaimer}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
