import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import ImgLoading from './ImgLoading';
import AnimateLoading from './AnimateLoading';
import ErrorText from 'components/common/ErrorText';

function hoc({mapDataToProps}) {
  return (WrappedComponent) => {
    function LoadingComp(props) {
      const {
        loading,
        category,
        animateCategory,
        imgCategory,
        error,
        module,
        errCategory,
        height
      } = mapDataToProps(props);
      let output;
      if (loading) {
        switch (category) {
          case 0:
            // animateCategory默认调用的是6个条状
            // 传数字 1 进去调用的是3个小条状
            output = <AnimateLoading animateCategory={animateCategory} height={height} />;
            break;
          case 1:
            output = <ImgLoading imgCategory={imgCategory} />;
            break;
          case 2:
            output = (
              <div className={styles.makeUp}>
                <div className={styles.makeUpAnimateLoading}>
                  <AnimateLoading />
                </div>
                <div className={styles.makeUpImgLoading}>
                  <ImgLoading imgCategory={imgCategory} />
                </div>
              </div>
            );
            break;
          default:
            output = <AnimateLoading />;
            break;
        }
      } else if (error) {
        output = <ErrorText module={module} error={error} errCategory={errCategory} height={height} />;
      } else {
        output = <WrappedComponent {...props} />;
      }
      return output;
    }
    return observer(LoadingComp);
  };
}
export default hoc;
