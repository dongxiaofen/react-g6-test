import React from 'react';
import { observer } from 'mobx-react';
import NodeIntro from '../NodeIntro';
import styles from './index.less';

function VerTab({ blackListScanStore }) {
  const scanModuleArr = [
    '行政处罚',
    '经营异常',
    '被金融机构起诉',
    '股权冻结',
    '失信记录',
    '税务黑名单',
    '银联黑名单',
    '支付黑名单',
    '老赖清单',
    '运营商黑名单',
    '企业主黑名单'
  ];
  const nodeDict = {
    closenessCentralityBlack: '网络中心点',
    degreesCentralityBlack: '网络明星点',
    eigenvectorCentralityBlack: '网络控制点',
    betweennessCentralityBlack: '桥梁节点',
  };
  const coefficientDict = {
    closenessCentralityBlack: '中心系数',
    degreesCentralityBlack: '明星系数',
    eigenvectorCentralityBlack: '控制系数',
    betweennessCentralityBlack: '桥梁系数',
  };
  const relationDict = {
    COMPANY_FR: '法人',
    COMPANY_SHAREHOLDER: '股东',
    COMPANY_OUT_INVEST: '企业对外投资',
    FR_OUT_INVEST: '法人对外投资',
    EXECUTIVE_OUT_INVEST: '高管对外投资',
    SHAREHOLDER_OUT_INVEST: '股东对外投资',
  };
  const scanLen = scanModuleArr.length;
  const data = blackListScanStore.data;
  const handleMain = (item) => {
    if (item.blacklistNum === 0) {
      return <span> - 以下 <span className={styles.scanItemNum}>{scanLen}</span> 项没有问题</span>;
    }
    return '';
  };
  const handleRelated = (item) => {
    const scanNumStr = <span className={styles.scanNum}>{`已扫描 ${item.numOfnodes} 个重要关系（公司/个人）`}</span>;
    if (item.blacklistNum === 0) {
      return <span><span> - 以下 <span className={styles.scanItemNum}>{scanLen}</span> 项没有问题</span>{scanNumStr}</span>;
    }
    return scanNumStr;
  };
  const handleNetwork = (item) => {
    const scanNumStr = <span className={styles.scanNum}>{`已扫描 ${item.numOfnodes} 个关键网络节点（公司/个人）`}</span>;
    if (item.blacklistNum === 0) {
      return <span><span> - 以下 <span className={styles.scanItemNum}>{scanLen}</span> 项没有问题</span>{scanNumStr}</span>;
    }
    return scanNumStr;
  };
  const conf = [
    {name: '主体公司', key: 'main', handleInfo: handleMain},
    {name: '关联关系', key: 'related', handleInfo: handleRelated},
    {name: '网络关系', key: 'network', handleInfo: handleNetwork},
  ];
  const createModule = (itemData) => {
    return scanModuleArr.map((key, idx) => {
      if (itemData.matchedBlacklistTypes && itemData.matchedBlacklistTypes.indexOf(key) === -1) {
        return (
          <div key={key} className={styles.moduleItem}>
            <div className={styles.moduleImg + idx}>
              <p>{key}</p>
            </div>
            <p className={styles.scanStatus}>安全</p>
          </div>
        );
      }
    });
  };
  const createAbnormalList = (itemData, itemKey) => {
    let list = [];
    if (itemKey === 'main' || itemKey === 'related') {
      list = itemData.blacklistCompInfo || []; // 加上[]防止数据异常
    }
    // 将网络图扫描结果数据结构格式化为同主体和关联扫描结果类似的数据结构
    if (itemKey === 'network') {
      ['closenessCentralityBlack', 'degreesCentralityBlack', 'eigenvectorCentralityBlack', 'betweennessCentralityBlack'].map((nodeName) => {
        itemData[nodeName].nodesDetail.filter((item) => {
          return item.blacklistCompInfo.length > 0;
        }).forEach(item => {
          item.blacklistCompInfo.forEach(blackItem => {
            const newItem = Object.assign({
              nodeType: nodeDict[nodeName],
              name: item.name,
              coefficient: coefficientDict[nodeName],
              value: item.value,
            }, blackItem);
            list.push(newItem);
          });
        });
      });
    }
    return list.map((item, idx) => {
      return (
        <div key={idx} className={styles.abnormalItem}>
          <p className={styles.abnormalType + ' ' + styles.typeImg + scanModuleArr.indexOf(item.blacklistType)}>
            <span>{item.blacklistType}</span>
            {itemKey === 'related' && <span className={styles.relationType}>
              {` - ${item.name}（${relationDict[item.relationType]}${/INVEST$/.test(item.relationType) ? `，投资金额${item.relationTypeDetail.investAmount}万` : ''}）`}
            </span>}
            {itemKey === 'network' && <span className={styles.relationType}>
              {` - ${item.nodeType} - ${item.name}，${item.coefficient} ${item.value}`}
            </span>}
          </p>
          <p className={styles.eventDate}>
            <span className={styles.hitCount}>{`共命中 ${item.count} 次`}</span>
            <span>{`最近命中时间：${item.eventDate}`}</span>
          </p>
        </div>
      );
    });
  };
  const extend = blackListScanStore.extend;
  const extendMain = (item) => {
    const ext = extend[item.key].ext;
    blackListScanStore.setValue(`extend.${item.key}.ext`, !ext);
  };
  const extendSub = (item) => {
    const subExt = extend[item.key].subExt;
    blackListScanStore.setValue(`extend.${item.key}.subExt`, !subExt);
  };
  const showNodeIntro = () => {
    blackListScanStore.setValue('nodeIntroVis', true);
  };
  const hideNodeIntro = () => {
    blackListScanStore.setValue('nodeIntroVis', false);
  };
  const { nodeIntroVis } = blackListScanStore;
  return (
    <div>
      {conf.map(item => {
        const ext = extend[item.key].ext;
        const subExt = extend[item.key].subExt;
        const itemData = data[item.key];
        const riskLen = itemData.matchedBlacklistTypes && itemData.matchedBlacklistTypes.length || 0;
        return (
          <div key={item.key} className={styles.item}>
            <div className={styles.mainLine}>
              {item.name}
              {item.handleInfo(itemData)}
              <span onClick={extendMain.bind(null, item)} className={ext ? styles.arrowUp : styles.arrowDown}></span>
              {item.key === 'network' ? <div className={styles.nodeInfo}>
                <span onMouseEnter={showNodeIntro} onMouseLeave={hideNodeIntro}>节点说明</span>
                <NodeIntro visible={nodeIntroVis}/>
              </div> : null}
            </div>
            <div className={ext ? styles.mainConShow : styles.mainConHide}>
              {itemData.blacklistNum !== 0 ? <div className={styles.abnormalBox}>
                {createAbnormalList(itemData, item.key)}
              </div> : null}
              {itemData.blacklistNum !== 0 ? <div className={styles.subLine}>
                以下<span className={styles.normalCount}>{scanLen - riskLen}</span>项没有问题
                <span onClick={extendSub.bind(null, item)} className={subExt ? styles.arrowUp : styles.arrowDown}></span>
              </div> : null}
              <div className={subExt ? styles.moduleBoxShow : styles.moduleBoxHide}>
                {createModule(itemData)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default observer(VerTab);
