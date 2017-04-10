import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import CfcaSolutionBody from './CfcaSolutionBody';
import SolutionBody from './SolutionBody';
import pathval from 'pathval';
import CfcaFooter from 'components/common/CfcaFooter';
import Footer from 'components/common/Footer';
import { DownLoadApp } from 'components/downLoadApp';

function SolutionPage({clientStore}) {
  let output;
  let footer;
  const envConfig = pathval.getPathValue(clientStore, 'envConfig');
  if (envConfig === 'cfca_prod') {
    output = <CfcaSolutionBody {...this.props} />;
    footer = <CfcaFooter />;
  } else {
    output = <SolutionBody {...this.props}/>;
    footer = <Footer />;
  }
  return (
    <div>
      <DownLoadApp {...this.props} />
      {output}
      {footer}
    </div>
  );
}

SolutionPage.propTypes = {
  envConfig: PropTypes.string,
  output: PropTypes.object,
  footer: PropTypes.object
};
export default inject('clientStore')(observer(SolutionPage));
