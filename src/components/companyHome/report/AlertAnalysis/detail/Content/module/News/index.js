import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function News({data, dataStore, ruleType}) {
  let itemData = data.detail[0];
  if (ruleType !== 84) {
    data.content.alterDt = data.alterDt;
    itemData = data.content;
  }
  const meta = {
    dict: 'news',
    body: [
      {'key': 'title', 'width': '12'},
      {'key': 'alterDt', 'width': '12'},
      {'key': 'detail', 'width': '12', keyType: 'detail'}
    ],
    item: itemData,
  };
  return (
    <SimpleCard meta={meta} dataStore={dataStore}/>
  );
}

News.propTypes = {
  foo: PropTypes.string,
};
export default observer(News);
