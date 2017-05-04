import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function News({data}) {
  data.content.alterDt = data.alterDt;
  const meta = {
    dict: 'news',
    body: [
      {'key': 'title', 'width': '12'},
      {'key': 'alterDt', 'width': '6'},
    ],
    item: data.content,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

News.propTypes = {
  foo: PropTypes.string,
};
export default observer(News);
