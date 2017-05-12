import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function DetailContent({}) {
  return (
    <div className={styles}>
      this is content
    </div>
  );
}

DetailContent.propTypes = {
  foo: PropTypes.string,
};
export default observer(DetailContent);
