import React from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
function Content() {
  return (
    <div>
      <ModuleTitle module="新闻内容" />
      test
    </div>
  );
}
export default observer(Content);
