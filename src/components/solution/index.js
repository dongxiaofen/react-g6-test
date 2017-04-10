import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import CfcaSolutionBody from './CfcaSolutionBody';
import SolutionBody from './SolutionBody';
import CfcaFooter from 'components/common/CfcaFooter';
import Footer from 'components/common/Footer';
import { DownLoadApp } from 'components/downLoadApp';

function SolutionPage({props}) {
  let output;
  let footer;
  // const envConfig = this.props.client.get('envConfig');
  const envConfig = 'cfca_prod';
  if (envConfig === 'cfca_prod') {
    output = <CfcaSolutionBody {...props} />;
    footer = <CfcaFooter />;
  } else {
    output = <SolutionBody {...props}/>;
    footer = <Footer />;
  }
  return (
    <div>
      <DownLoadApp {...props} />
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
export default observer(SolutionPage);
