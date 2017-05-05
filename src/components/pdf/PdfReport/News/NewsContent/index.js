import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function NewsContent({}) {
  return (
    <div>

    </div>
  );
}

NewsContent.propTypes = {
  foo: PropTypes.string,
};
export default observer(NewsContent);
