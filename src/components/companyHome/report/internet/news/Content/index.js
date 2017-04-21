import React from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import ErrorText from 'components/hoc/LoadingComp/ErrorText';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import Pager from './Pager';
import NewsTabs from './NewsTabs';
function Content({internetStore}) {
  const data = internetStore.newsData.data;
  let output;
  const error = internetStore.newsData.error;
  if (error && error.errorCode === 404208) {
    output = <ErrorText error={{message: '暂无信息，平台正为您实时抓取新闻，请五分钟后再浏览'}} />;
  } else if (error) {
    output = <ErrorText module="新闻分析" errCategory={0} />;
  } else if (data) {
    output = (
      <div>
        test
        <Pager total={100} />
      </div>
    );
  } else if (data === undefined) {
    output = <AnimateLoading />;
  }
  return (
    <div>
      <ModuleTitle module="新闻分析" />
      <NewsTabs internetStore={internetStore} />
      {output}
    </div>
  );
}
export default observer(Content);
