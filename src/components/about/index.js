import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import AboutBody from './AboutBody';
import pathval from 'pathval';
import CfcaAboutBody from './CfcaAboutBody';
import { DownLoadApp } from 'components/downLoadApp';

function AboutPage({clientStore}) {
  let output;
  const envConfig = pathval.getPathValue(clientStore, 'envConfig');
  if (envConfig === 'cfca_prod') {
    output = <CfcaAboutBody {...this.props} />;
  } else {
    output = <AboutBody {...this.props}/>;
  }
  return (
    <div>
      <DownLoadApp {...this.props} />
      {output}
    </div>
  );
}

AboutPage.propTypes = {
  client: PropTypes.object,
};
export default inject('clientStore')(observer(AboutPage));
