import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

function CheckInfo({data}) {
  const meta = {
    dict: 'checkMessageList',
    body: [
      {'key': 'institution', 'width': '6'},
      {'key': 'checkType', 'width': '6'},
      {'key': 'checkResult', 'width': '12'}
    ],
    item: data.content,
  };
  return (
    <SimpleCard meta={meta} />
  )
}

CheckInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(CheckInfo);
