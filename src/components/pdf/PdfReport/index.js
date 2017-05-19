import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import Header from './Header';
import Overview from './OverView';
import Base from './Base';
import Stock from './Stock';
import Risk from './Risk';
import News from './News';
import Assets from './Assets';
import Network from './NetWork';
import Team from './Team';

function PdfReport(bannerStore) {
  const judgeIsModuleExist = (module) => {
    console.log(module);
    const pdfModule = bannerStore.pdfDownloadKeys;
    return (pdfModule && pdfModule.indexOf(module) !== -1) || pdfModule === null;
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
          <News judgeIsModuleExist={judgeIsModuleExist} />
          <Assets judgeIsModuleExist={judgeIsModuleExist} />
          <Network judgeIsModuleExist={judgeIsModuleExist} />
          <Team judgeIsModuleExist={judgeIsModuleExist} />
        </Col>
      </Row>
    </Container>
  );
}

PdfReport.propTypes = {
  judgeIsModuleExist: PropTypes.func,
};
export default inject('bannerStore')(observer(PdfReport));
