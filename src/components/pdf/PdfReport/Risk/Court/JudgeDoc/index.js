import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';
import styles from './index.less';
import KeyValue from 'components/common/pdf/KeyValue';
import config from 'dict/reportModule';

function JudgeDoc({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="判决文书" />
        <PdfNotFound />
      </div>
    );
  }
  const createDocList = (data) => {
    const output = [];
    const dict = data.dict;
    data.item.forEach((_item, index) => {
      const single = [];
      data.dataConfig.forEach(configItem => {
        const parentProps = {};
        if (configItem.needHtmlParse) {
          parentProps.needHtmlParse = true;
        }
        single.push(
            <KeyValue
              key={`${configItem.key}judgeDoc`}
              {...parentProps}
              theKey={config[dict][configItem.key]}
              theValue={configItem.handle ? configItem.handle(_item[configItem.key], _item) : _item[configItem.key]}
              keyClass="key"
              styleClass="styleClass"
              valueClass="value"
              width={configItem.width} />
          );
      });
      output.push(
        <div key={`${index}singleBox`} className={styles.singleBox}>
          {single}
        </div>
      );
    });
    return output;
  };
  const handleLitigant = (data) => {
    let str = '';
    data.forEach((item) => {
      str += `${item.litigantName}（${item.litigantType}）;`;
    });
    return str;
  };
  const serializeArr = (arr) => {
    const newArr = [];
    arr.forEach(item => {
      item.forEach(_item => {
        newArr.push(_item);
      });
    });
    return newArr;
  };
  // const handleDetail = (value, item) => {
  //   const detail = this.props.pdfView.getIn(['judgeDoc', 'detailList', item.docId]);
  //   return value || detail || '正在获取数据...';
  // }
  const data = {
    dataConfig: [
      {'key': 'label', 'width': '6'},
      {'key': 'title', 'width': '12'},
      {'key': 'identity', 'width': '6'},
      {'key': 'caseReason', 'width': '6'},
      {'key': 'trailDate', 'width': '6'},
      {'key': 'publishDate', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', 'handle': handleLitigant},
      {'key': 'detail', 'width': '12', 'needHtmlParse': true}
    ],
    item: serializeArr(moduleData),
    dict: 'judgeDoc'
  };
  return (
    <div>
      <SecondTitle module="判决文书" />
      <div>
        {createDocList(data)}
      </div>
    </div>
  );
}


JudgeDoc.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(JudgeDoc);
