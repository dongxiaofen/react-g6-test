import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import Header from './Header';
import Overview from './OverView';

function PdfReport({pdfStore}) {
  return (
    <Container>
      <Row>
        <Col width="12">
          <Header />
          <Overview pdfStore={pdfStore} />
        </Col>
      </Row>
    </Container>
  );
}

PdfReport.propTypes = {
  foo: PropTypes.string,
};
export default inject('pdfStore')(observer(PdfReport));
