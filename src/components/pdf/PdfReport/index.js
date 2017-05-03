import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import Header from './Header';
import Overview from './OverView';

function PdfReport({}) {
  return (
    <Container>
      <Row>
        <Col width="12">
          <Header />
          <Overview />
        </Col>
      </Row>
    </Container>
  );
}

PdfReport.propTypes = {
  foo: PropTypes.string,
};
export default observer(PdfReport);
