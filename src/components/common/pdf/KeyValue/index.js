import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function KeyValue({width,
                    offset,
                    keyClass,
                    valueClass,
                    theKey,
                    theValue,
                    styleClass,
                    arrayType,
                    inArray,
                    needHtmlParse}) {
  const getValue = (value)=>{
    let output;
    if (!value) {
      output = '无';
    }else if (needHtmlParse) {
      output = <span dangerouslySetInnerHTML={createMarkup(value)} />;
    } else if (arrayType === 'true') {
      const arrayValue = [];
      value.map((obj)=>{
        arrayValue.push(obj.litigantName);
      });
      const text = arrayValue.join('；');
      output = (
        <span>{text}</span>
      );
    } else if (inArray === 'true') {
      const arrayValue = [];
      value.map((obj)=>{
        arrayValue.push(obj);
      });
      const text = arrayValue.join('；');
      output = (
        <span>{text}</span>
      );
    } else {
      output = (
        <span>{value}</span>
      );
    }
    return output;
  }
  const createMarkup = (data)=>{
    return {__html: data};
  }
  return (
    <div className={'col-md-' +width + ' ' + 'col-md-offset-' + offset + ' ' + styles[styleClass]}>
      <span className={styles[keyClass]}>{theKey}：</span>
      <span className={styles[valueClass]}>
            {getValue(theValue)}
        </span>
    </div>
  );
}

KeyValue.propTypes = {
  width: PropTypes.string,
  offset: PropTypes.string,
  keyClass: PropTypes.string,
  valueClass: PropTypes.string,
  theKey: PropTypes.string,
  theValue: PropTypes.string,
  styleClass: PropTypes.string,
  needHtmlParse: PropTypes.string,
  arrayType: PropTypes.string,
  inArray: PropTypes.string,
};
export default observer(KeyValue);
