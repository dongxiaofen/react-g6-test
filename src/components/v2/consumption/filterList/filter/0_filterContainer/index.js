import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';

function FilterContainer(props) {
  return (
    <div className="clearfix">
      <div className={styles.title} style={props.titleStyle}>{props.title}</div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
FilterContainer.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.object,
};
export default observer(FilterContainer);
