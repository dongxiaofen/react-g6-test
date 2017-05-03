import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import KeyValue from 'components/common/pdf/KeyValue';
import styles from './index.less';

function PdfSimpleKey({dataConfig, item, dict, hasConfig}) {
  const createSimpleKey = () => {
    const output = [];
    if (this.props.type === 'array') {
      const currData = this.getCurrData();
      currData.map((dataItem)=>{
        const row = [];
        dataConfig.map((configItem)=>{
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
                theKey={hasConfig ? config[dict][configItem.key] : configItem.key}
                theValue={configItem.handle ? configItem.handle(dataItem[configItem.key], dataItem) : dataItem[configItem.key]}
                width={configItem.width} />
            );
          }
        });
        output.push(<div className={styles.single}>{row}</div>);
      });
    } else if (this.props.type === 'website') {
      item.forEach((websiteItem) => {
        dataConfig.map((configItem) => {
          output.push(
            <KeyValue
              theKey={config[dict][configItem.key]}
              theValue={websiteItem[configItem.key]}
              width={configItem.width} />
          );
        });
      });
    } else {
      dataConfig.map((configItem)=>{
        output.push(
          <KeyValue
            theKey= {hasConfig ? config[dict][configItem.key] : configItem.key}
            theValue={configItem.handle ? configItem.handle(item[configItem.key]) : item[configItem.key]}
            width={configItem.width} />
        );
      });
    }
    return output;
  }
  return (
    <div className={styles.wrap}>
      {createSimpleKey()}
    </div>
  );
}

PdfSimpleKey.propTypes = {
  config: PropTypes.object,
  item: PropTypes.object,
  dict: PropTypes.string,
};
export default observer(PdfSimpleKey);
