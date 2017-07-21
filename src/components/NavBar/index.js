import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';

import styles from './index.less';
import Container from 'components/common/layout/Container';

import Menu from './Menu';
import NavAction from './NavAction';

function NavBar({routing, clientStore}) {
  return (
    <div className={`clearfix ${styles.navbar}`}>
      <Container>
        <Menu routing={routing} clientStore={clientStore}/>
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
export default inject('routing', 'clientStore')(observer(NavBar));
