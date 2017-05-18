import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
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

function PdfReport() {
  // const judgeIsStock = () => {
  //   const banner = this.props.data.get('banner');
  //   if (banner) {
  //     return banner.stockType || banner.stockCode;
  //   }
  // };
  const judgeIsModuleExist = () => {
    return true;
    // const pdfModule = this.props.pdfModule;
    // if (module === 'STOCK') {
    //   const isStock = judgeIsStock();
    //   return isStock && ((pdfModule && pdfModule.indexOf(module) !== -1) || pdfModule === undefined);
    // }
    // return (pdfModule && pdfModule.indexOf(module) !== -1) || pdfModule === undefined;
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
export default observer(PdfReport);
