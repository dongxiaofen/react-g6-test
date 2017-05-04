import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function WebSite({moduleData}) {
  if (moduleData === undefined || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="网站或网店信息"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'type', 'width': '4'},
      {'key': 'name', 'width': '4'},
      {'key': 'link', 'width': '4'},
    ],
    item: moduleData,
    dict: 'yearWebsite',
    hasConfig: true,
    type: 'website',
  };
  return (
    <div>
      <SecondTitle module="网站或网店信息" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

WebSite.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(WebSite);
