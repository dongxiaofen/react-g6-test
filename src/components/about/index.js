import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import AboutBody from './AboutBody';
import CfcaAboutBody from './CfcaAboutBody';
import { DownLoadApp } from 'components/downLoadApp';

function AboutPage(props) {
  let output;
  // const envConfig = props.client.get('envConfig');
  const envConfig = 'cfca_prod';
  if (envConfig === 'cfca_prod') {
    output = <CfcaAboutBody {...this.props} />;
  } else {
    output = <AboutBody {...this.props}/>;
  }
  return (
    <div>
      <DownLoadApp {...props} />
      {output}
    </div>
  );
}

AboutPage.propTypes = {
  client: PropTypes.object,
};
export default observer(AboutPage);
