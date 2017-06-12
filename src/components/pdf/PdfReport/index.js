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
import Tax from './Tax';
import styles from './index.less';

function PdfReport({}) {
  const judgeIsModuleExist = (module) => {
    console.log(module);
    return true;
    // const pdfModule = pdfStore.pdfTypesKey;
    // return (pdfModule && pdfModule.includes(module));
  };
  return (
    <Container>
      <Row>
        <Col className={styles.pdf_body} width="12">
            <Header />
            {judgeIsModuleExist('SUMMARY') ? <Overview /> : ''}
            {judgeIsModuleExist('CORP') ? <Base judgeIsModuleExist={judgeIsModuleExist} /> : ''}
            {judgeIsModuleExist('STOCK') ? <Stock judgeIsModuleExist={judgeIsModuleExist} /> : ''}
            {judgeIsModuleExist('TAX') ? <Tax judgeIsModuleExist={judgeIsModuleExist} /> : ''}
            {judgeIsModuleExist('RISK') ? <Risk judgeIsModuleExist={judgeIsModuleExist} /> : ''}
            {judgeIsModuleExist('NEWS') ? <News judgeIsModuleExist={judgeIsModuleExist} /> : ''}
            {judgeIsModuleExist('OPERATION') ? <Assets judgeIsModuleExist={judgeIsModuleExist} /> : ''}
            {judgeIsModuleExist('NETWORK') ? <Network judgeIsModuleExist={judgeIsModuleExist} /> : ''}
            {judgeIsModuleExist('TEAM') ? <Team judgeIsModuleExist={judgeIsModuleExist} /> : '' }
        </Col>
      </Row>
    </Container>
  );
}

PdfReport.propTypes = {
  judgeIsModuleExist: PropTypes.func,
};
export default inject('pdfStore')(observer(PdfReport));
