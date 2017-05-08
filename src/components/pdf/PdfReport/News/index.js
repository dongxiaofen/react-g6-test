import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import NewsAnalyse from './NewsAnalyse';
import NewsContent from './NewsContent';
import pathval from 'pathval';
import PdfTitle from 'components/common/pdf/PdfTitle';

function News({pdfStore}) {
  return (
    <div>
      <PdfTitle module="新闻信息" subModule="新闻舆情" />
      <NewsAnalyse moduleData={pathval.getPathValue(pdfStore, 'internet.analysis')} />
      <NewsContent moduleData={pathval.getPathValue(pdfStore, 'internet.info.data.content')} />
    </div>
  );
}

News.propTypes = {
  pdfStore: PropTypes.object,
};
export default inject('pdfStore')(observer(News));
