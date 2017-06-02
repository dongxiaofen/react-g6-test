import React from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import ErrorText from 'components/common/ErrorText';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import NewsTabs from './NewsTabs';
import Table from './Table';
import Pager from './Pager';
import styles from './index.less';
function Content({internetStore}) {
  const data = internetStore.newsData.data;
  let output;
  const error = internetStore.newsData.error;
  if (error && error.errorCode === 404208) {
    output = <ErrorText error={{message: '暂无信息，平台正为您实时抓取新闻，请五分钟后再浏览'}} />;
  } else if (error) {
    output = <ErrorText module="新闻内容" />;
  } else if (!data) {
    output = <AnimateLoading />;
  } else if (data.content.length === 0) {
    output = <ErrorText module="新闻内容" />;
  } else {
    output = (
      <div>
        <Table data={data.content} />
        <Pager total={data.totalElements} />
      </div>
    );
  }
  return (
    <div>
      <div className="clearfix">
        <div className={styles.title}>
          <ModuleTitle module="新闻内容" />
        </div>
        <div className={`clearfix ${styles.tabs}`}>
          <NewsTabs internetStore={internetStore} />
        </div>
      </div>
      <div>
        {output}
      </div>
    </div>
  );
}
export default observer(Content);
