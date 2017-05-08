import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function NewsContent({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="新闻内容" />
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'title', 'width': '12'},
      {'key': 'label', 'width': '6'},
      {'key': 'publishTime', 'width': '6'},
    ],
    hasConfig: true,
    item: moduleData,
    dict: 'newsContent',
    type: 'array'
  };
  return (
    <div>
      <SecondTitle module="新闻内容" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

NewsContent.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(NewsContent);
