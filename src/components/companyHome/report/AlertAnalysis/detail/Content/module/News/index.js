import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function News({data}) {
  const meta = {
    dict: 'news',
    body: [
      {'key': 'title', 'width': '12'},
      {'key': 'date', 'width': '6'},
    ],
    item: data,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

News.propTypes = {
  foo: PropTypes.string,
};
export default observer(News);
