import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import pathval from 'pathval';
import PdfTable from 'components/common/pdf/PdfTable';
import PdfNotFound from 'components/common/pdf/PdfNotFound';

function CurrentNetwork({pdfStore}) {
  const currentNetwork = pathval.getPathValue(pdfStore, 'network.currentNetwork');
  const moduleData = currentNetwork && pathval.getPathValue(currentNetwork, 'nodes');
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <div style={{height: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  const dict = {
    'MONITOR': '监控中',
    'RELATED_MONITOR': '监控中',
    'REPORT': '已创建报告',
    'PAUSE': '暂停监控',
  };
  const mapRelation = (cateList) => {
    const relationDict = ['法人代表', '高管', '股东', '对外投资', '历史关联', '共同原被告', '诉讼对立方', '供求关系'];
    let str = '';
    cateList.forEach(cate => {
      str += relationDict[cate - 1] + ' ';
    });
    return str;
  };
  const mapMonitorStatus = (monitorList, name, cateType) => {
    if (cateType === 2) {
      return '/';
    }
    let status = '未监控';
    const length = monitorList.length;
    for (let index = 0; index < length; index++) {
      if (monitorList[index].companyName === name) {
        status = dict[monitorList[index].monitorStatus];
        break;
      }
    }
    return status;
  };
  const mapInvCo = (links, name, cateList, key) => {
    const companyName = pathval.getPathValue(pdfStore, 'banner.name');
    const len = links.length;
    if (cateList.indexOf(3) + 1) {
      for (let index = 0; index < len; index++) {
        if (links[index].target === companyName && links[index].source === name) {
          if (links[index][key] === -1) {
            return '/';
          }
          return key === 'invRatio' ? links[index][key] + '%' : links[index][key] + '万' + links[index].invCurrency;
        }
      }
    }
    if (cateList.indexOf(4) + 1) {
      for (let index = 0; index < len; index++) {
        if (links[index].source === companyName && links[index].target === name) {
          if (links[index][key] === -1) {
            return '/';
          }
          return key === 'invRatio' ? links[index][key] + '%' : links[index][key] + '万' + links[index].invCurrency;
        }
      }
    }
    return '/';
  };
  const formatData = () => {
    const currentNetworkData = pathval.getPathValue(pdfStore, 'network');
    const result = [];
    const nodes = currentNetworkData.currentNetwork.nodes;
    const links = currentNetworkData.currentNetwork.links;
    const monitorList = currentNetworkData.monitorInfoList;
    nodes.forEach(node => {
      if (node.category) {
        const newNode = {
          name: node.name,
          relation: mapRelation(node.cateList),
          monitorStatus: mapMonitorStatus(monitorList, node.name, node.cateType),
          invConum: mapInvCo(links, node.name, node.cateList, 'invConum'),
          invRatio: mapInvCo(links, node.name, node.cateList, 'invRatio'),
          status: node.status === 0 ? '是' : '否',
          caseRecord: node.caseRecord.length,
        };
        result.push(newNode);
      }
    });
    return result;
  };
  const data = {
    dataConfig: [
      {key: 'name', width: '2.5'},
      {key: 'relation', width: '2.3'},
      {key: 'invConum', width: '1'},
      {key: 'invRatio', width: '1'},
      {key: 'monitorStatus', width: '1'},
      {key: 'status', width: '1'},
      {key: 'caseRecord', width: '1.2'},
    ],
    items: formatData(),
    dict: 'currentNetwork',
  };
  return (
    <div>
      <div style={{height: '30px'}}></div>
      <PdfTable {...data} />
    </div>
  );
}

CurrentNetwork.propTypes = {
  pdfStore: PropTypes.object,
};
export default observer(CurrentNetwork);
