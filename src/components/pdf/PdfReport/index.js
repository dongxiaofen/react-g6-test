import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
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
import EquityRelated from './EquityRelated';
import AnalysisReport from './AnalysisReport';
import styles from './index.less';
import getPermissionMeta from 'helpers/getPermissionMeta';
function PdfReport({clientStore}) {
  const judgeIsModuleExist = () => {
    // const pdfModule = pdfStore.pdfTypesKey;
    // return (pdfModule && pdfModule.includes(module));
    return true;
  };
  return (
    <Container>
      <Row>
        <Col className={styles[getPermissionMeta(clientStore.envConfig).pdfStyle]} width="12">
          <Header />
          <Overview />
          <Base judgeIsModuleExist={judgeIsModuleExist}/>
          <Stock judgeIsModuleExist={judgeIsModuleExist}/>
          <Risk judgeIsModuleExist={judgeIsModuleExist}/>
          <EquityRelated judgeIsModuleExist={judgeIsModuleExist}/>
          <News judgeIsModuleExist={judgeIsModuleExist}/>
          <Assets judgeIsModuleExist={judgeIsModuleExist}/>
          <Network judgeIsModuleExist={judgeIsModuleExist}/>
          <Team judgeIsModuleExist={judgeIsModuleExist}/>
          <AnalysisReport judgeIsModuleExist={judgeIsModuleExist}/>
          <Tax judgeIsModuleExist={judgeIsModuleExist}/>
        </Col>
      </Row>
    </Container>
  );
}

PdfReport.propTypes = {
  judgeIsModuleExist: PropTypes.func,
};
export default inject('pdfStore', 'clientStore')(observer(PdfReport));
