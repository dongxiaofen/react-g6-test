import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import Container from 'components/common/layout/Container';

import Menu from './Menu';
import NavAction from './NavAction';

function NavBar({ routing }) {
  return (
    <div className={`clearfix ${styles.navbar}`}>
      <Container>
        <Menu routing={routing} />
        <NavAction />
      </Container>
      <div className={styles.navbarBottomBorder}></div>
    </div>
  );
}

NavBar.propTypes = {
  routing: PropTypes.object,
  clientStore: PropTypes.object,
};
export default observer(NavBar);
