import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function Content({}) {
  return (
    <div>
      Content
    </div>
  );
}

Content.propTypes = {
  foo: PropTypes.string,
};
export default observer(Content);
