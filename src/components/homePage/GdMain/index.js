import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Login from 'components/loginGd';
import styles from './index.less';

function GdMain({}) {
  return (
    <Login />
  );
}

GdMain.propTypes = {
  foo: PropTypes.string,
};
export default observer(GdMain);
