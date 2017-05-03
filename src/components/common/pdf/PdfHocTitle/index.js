import React from 'react';

function pdfHocTitle({pdfTitleProps}) {
  return (Comp) => {
    function pdfTitle(props) {
      const titleProps = pdfTitleProps(props);
      const pdfModule = titleProps.pdfModule;
      const whetherFn = titleProps.whetherFn;
      const whetherKeysArray = titleProps.whetherKeysArray;
      if (pdfModule === undefined
        || (whetherFn === undefined
        && whetherKeysArray === undefined)) {
        return <Comp {...props} />;
      }
      const whetherKeysIsFalse = whetherKeysArray.every((item) => {
        return whetherFn(item) === false;
      });
      return !whetherKeysIsFalse ? <Comp {...props} /> : null;
    }
    return pdfTitle;
  };
}

export default pdfHocTitle;
