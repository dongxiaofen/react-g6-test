import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import Header from './Header';
import Overview from './OverView';
import Base from './Base';
import Stock from './Stock';
import Risk from './Risk';

function PdfReport({}) {
  const judgeIsModuleExist = (module) => {
    const pdfModule = this.props.pdfModule;
    if (module === 'STOCK') {
      const isStock = this.judgeIsStock();
      return isStock && ((pdfModule && pdfModule.indexOf(module) !== -1) || pdfModule === undefined);
    }
    return (pdfModule && pdfModule.indexOf(module) !== -1) || pdfModule === undefined;
  };
  return (
    <Container>
      <Row>
        <Col width="12">
          <Header />
          <Overview />
          <Base judgeIsModuleExist={judgeIsModuleExist} />
          <Stock judgeIsModuleExist={judgeIsModuleExist} />
          <Risk judgeIsModuleExist={judgeIsModuleExist} />
        </Col>
      </Row>
    </Container>
  );
}

PdfReport.propTypes = {
  foo: PropTypes.string,
};
export default observer(PdfReport);
