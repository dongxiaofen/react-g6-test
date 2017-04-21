import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import Container from 'components/common/layout/Container';

import Menu from './Menu';

function NavBar({ location }) {
  return (
    <div className={`clearfix ${styles.navbar}`}>
      <Container>
        <Menu location={location} />
      </Container>
      <div className={styles.navbarBottomBorder}></div>
    </div>
  );
}

NavBar.propTypes = {
  location: PropTypes.object,
};
export default observer(NavBar);
