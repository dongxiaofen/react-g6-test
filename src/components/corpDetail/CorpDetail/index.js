import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function CorpDetail({}) {
  return (
    <div>
      CorpDetail
    </div>
  );
}

CorpDetail.propTypes = {
  foo: PropTypes.string,
};
export default observer(CorpDetail);
