import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';

import styles from './index.less';
import Container from 'components/common/layout/Container';

import Menu from './Menu';
// import Action from './Action';

function NavBar({ location }) {
  return (
    <div className={`clearfix ${styles.navbar}`}>
      <Container>
        <Menu location={location} />
        {/* <Action location={location} clientStore={clientStore} /> */}
      </Container>
      <div className={styles.navbarBottomBorder}></div>
    </div>
  );
}

NavBar.propTypes = {
  location: PropTypes.object,
  clientStore: PropTypes.object,
};
export default inject('clientStore')(observer(NavBar));
