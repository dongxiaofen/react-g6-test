// import React, {PropTypes} from 'react';
// import { observer, inject } from 'mobx-react';

// import styles from './index.less';
// import Container from 'components/common/layout/Container';

// import Menu from './Menu';

// function NavBar({ routing }) {
//   return (
//     <div className={`clearfix ${styles.menu}`}>
//       <Container>
//         {/*<Menu routing={routing} />*/}
//         <div className={`clearfix ${styles['menu-right']}`}>
//         </div>
//       </Container>
//       <div className={styles.menuBottomBorder}></div>
//     </div>
//   );
// }

// NavBar.propTypes = {
//   routing: PropTypes.object,
// };
// export default inject('routing')(observer(NavBar));

import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
@inject('routing')
@observer
export default class NavBar extends Component {
  static propTypes = {
    routing: PropTypes.object,
  }
  render() {
    console.log(this.props.routing, '--------------------------routing');
    return (
      <div>
      xxxxx
        this is NavBar
      </div>
    );
  }
}
