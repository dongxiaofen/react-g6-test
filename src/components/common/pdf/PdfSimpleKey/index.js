import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import KeyValue from 'components/common/pdf/KeyValue';
import styles from './index.less';
import config from 'dict/reportModule';

function PdfSimpleKey({dataConfig, item, type, dict, hasConfig}) {
  const createSimpleKey = () => {
    const output = [];
    if (type === 'array') {
      item.map((dataItem, index)=>{
        const row = [];
        dataConfig.map((configItem, number)=>{
          const parentProps = {};
          if (configItem.needHtmlParse) {
            parentProps.needHtmlParse = true;
          }
          if (configItem.handleBlock) {
            row.push(configItem.handleBlock(dataItem));
          } else {
            row.push(
              <KeyValue
                {...parentProps}
                key= {`arrValue${number}`}
                theKey={hasConfig ? config[dict][configItem.key] : configItem.key}
                theValue={configItem.handle ? configItem.handle(dataItem[configItem.key], dataItem) : dataItem[configItem.key]}
                keyClass="key"
                styleClass="styleClass"
                valueClass="value"
                width={configItem.width} />
            );
          }
        });
        output.push(<div key={`${index}single`} className={styles.single}>{row}</div>);
      });
    } else if (type === 'website') {
      item.forEach((websiteItem) => {
        dataConfig.map((configItem) => {
          output.push(
            <KeyValue
              key = {`${configItem.key}websiteValue`}
              theKey={config[dict][configItem.key]}
              theValue={websiteItem[configItem.key]}
              keyClass="key"
              styleClass="styleClass"
              valueClass="value"
              width={configItem.width} />
          );
        });
      });
    } else {
      dataConfig.map((configItem)=>{
        output.push(
          <KeyValue
            key = {`${configItem.key}objectValue`}
            theKey= {hasConfig ? config[dict][configItem.key] : configItem.key}
            theValue={configItem.handle ? configItem.handle(item[configItem.key], item) : item[configItem.key]}
            keyClass="key"
            styleClass="styleClass"
            valueClass="value"
            width={configItem.width} />

        );
      });
    }
    return output;
  };
  return (
    <div className={styles.wrap}>
      {createSimpleKey()}
    </div>
  );
}
PdfSimpleKey.propTypes = {
  dataConfig: PropTypes.array,
  item: PropTypes.any,
  dict: PropTypes.string,
  type: PropTypes.string,
  hasConfig: PropTypes.bool,
};
export default observer(PdfSimpleKey);
