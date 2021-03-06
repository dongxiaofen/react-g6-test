// 统计各层的节点数
export function getLayerCount(nodesData, layerCount) {
  nodesData.map((node) => {
    if (layerCount[node.layer] === undefined) {
      layerCount[node.layer] = 1;
    } else {
      layerCount[node.layer]++;
    }
  });
}
// 获取最小半径公式
function getRadius(nodeCount, nodeRadius = 25) {
  return nodeRadius / Math.sin(Math.PI / nodeCount);
}

// 计算半径长度
export function getRadiusArr(radiusArr, layerCount) {
  Object.keys(layerCount).map((key) => {
    if (key > 0) {
      const defaultRadius = key === '1' ? 150 : radiusArr[key - 2] + 100;
      if (layerCount[key] === 1) { // 只有一个关联节点
        radiusArr.push(defaultRadius);
      } else {
        radiusArr.push(Math.max(defaultRadius, getRadius(layerCount[key])));
      }
    }
  });
}

// 获取所有节点坐标
export function getInitNodeXY(nodeXY, layerCount, nodesData, radiusArr, centerNodeX, centerNodeY) {
  const idxObj = {};
  Object.keys(layerCount).map((key) => {
    if (key > 0) {
      idxObj[key] = 0;
    }
  });
  nodesData.forEach((node) => {
    const nodeLayer = node.layer ? node.layer : 1;
    if (nodeLayer === 0) {
      node.x = centerNodeX;
      node.y = centerNodeY;
    } else {
      const xy = {
        x: radiusArr[nodeLayer - 1] * Math.cos(2 * idxObj[nodeLayer] * Math.PI / layerCount[nodeLayer]) + centerNodeX,
        y: centerNodeY - radiusArr[nodeLayer - 1] * Math.sin(2 * idxObj[nodeLayer] * Math.PI / layerCount[nodeLayer])
      };
      node.x = xy.x;
      node.y = xy.y;
      nodeXY[node.index] = xy;
      idxObj[nodeLayer]++;
    }
  });
}
// 用户添加新节点后重新计算所有节点坐标
export function getNewNodeXY(nodesData, nodeXY, centerNodeX, centerNodeY) {
  // 重新计算层的节点数
  const newLayerCount = {};
  nodesData.map((node) => {
    const nodeLayer = node.layer ? node.layer : 1;
    if (newLayerCount[nodeLayer] === undefined) {
      newLayerCount[nodeLayer] = 1;
    } else {
      newLayerCount[nodeLayer]++;
    }
  });
  const idxObj = {};
  Object.keys(newLayerCount).map((key) => {
    if (key > 0) {
      idxObj[key] = 0;
    }
  });
  // 重新计算半径
  const newRadiusArr = [];
  Object.keys(newLayerCount).map((key) => {
    if (key > 0) {
      const defaultRadius = key === '1' ? 150 : newRadiusArr[key - 2] + 100;
      if (newLayerCount[key] === 1) { // 只有一个关联节点
        newRadiusArr.push(defaultRadius);
      } else {
        newRadiusArr.push(Math.max(defaultRadius, getRadius(newLayerCount[key])));
      }
    }
  });
  nodesData.forEach((node) => {
    const nodeLayer = node.layer ? node.layer : 1;
    if (nodeLayer === 0) {
      node.x = centerNodeX;
      node.y = centerNodeY;
    } else {
      const xy = {
        x: newRadiusArr[nodeLayer - 1] * Math.cos(2 * idxObj[nodeLayer] * Math.PI / newLayerCount[nodeLayer]) + centerNodeX,
        y: centerNodeY - newRadiusArr[nodeLayer - 1] * Math.sin(2 * idxObj[nodeLayer] * Math.PI / newLayerCount[nodeLayer])
      };
      node.x = xy.x;
      node.y = xy.y;
      nodeXY[node.index] = xy;
      idxObj[nodeLayer]++;
    }
  });
}
// 判断节点是否隐藏
export function isNodeShow(checkeArr, cateList) {// index === -1代表没有被勾选上
  let index = -1;
  for (const cate of cateList) {
    if (checkeArr[cate - 1]) {
      index = cate - 1;
      break;
    }
  }
  return index === -1 ? false : true;
}
// 获取节点的颜色值
export function getNodeColor(checkeArr, cateList) {// index === -1代表没有被勾选上
  let index = -1;
  for (const cate of cateList) {
    if (checkeArr[cate - 1]) {
      index = cate - 1;
      break;
    }
  }
  return index + 1;
}
// 根据node的显示状态更新link的显示状态
export function updateLinksDisplay(nodes, links) {
  links.map((link) => {
    if (!nodes[nodes.findIndex((item) => item.name === link.source.name)].hide && !nodes[nodes.findIndex((item) => item.name === link.target.name)].hide) {
      link.hide = false;
      link.isFocus = false;
    } else {
      link.hide = true;
    }
  });
}
// 高亮选中节点相关的边
export function focusRelatedLinks(focusNodeName, edgesData) {
  edgesData.map((link) => {
    if (link.target.name === focusNodeName || link.source.name === focusNodeName) {
      link.isFocus = true;
    } else {
      link.isFocus = false;
    }
  });
}
// 网络图获取边的关系
export function getLinkInfo(data) {
  const description = [];
  const relation = data.name;
  Object.keys(relation).map((key) => {
    if (key === '股东' && data.invRatio !== -1) {
      const invCurrency = (data.invCurrency === '人民币' || data.invCurrency === '') ? '万人民币' : data.invCurrency;
      description.push(`${relation[key][0]}(投资金额: ${data.invConum + invCurrency},投资比例: ${data.invRatio.toFixed(2)}%)`);
    } else if (key === '共同原被告' || key === '诉讼对立方') {
      if (typeof relation[key][0] === 'string') {
        description.push(`${key}(${relation[key][0]})`);
      } else {
        relation[key].forEach((relItem)=>{
          const label = Object.keys(relItem)[0];
          const caseReason = relItem[label].length > 0 ? `(${relItem[label].join('、')})` : '';
          description.push(`${label}${caseReason}`);
        });
      }
    } else {
      description.push(`${key}(${relation[key].join('、')})`);
    }
  });
  return description.join(',');
}
// 风险关系获取边的关系
export function getBlackLinkInfo(data) {
  const description = [];
  const relation = data.relation;
  Object.keys(relation).map((key) => {
    if (key === '法务关联' || key === '诉讼对立方' || key === '共同原被告') {
      if (typeof relation[key][0] === 'string') {
        description.push(`${key}(${relation[key][0]})`);
      } else {
        relation[key].forEach((relItem)=>{
          const label = Object.keys(relItem)[0];
          const caseReason = relItem[label].length > 0 ? `(${relItem[label].join('、')})` : '';
          description.push(`${label}${caseReason}`);
        });
      }
    } else {
      description.push(`${key}(${relation[key][0]})`);
    }
  });
  return description.join(',');
}
// 风险关联图根据focusIdx更新节点的显示
export function updateNodeByFocusIdx(pathsArr, focusIdx, nodesData) {
  nodesData.map((node) => {
    if (pathsArr[focusIdx].relatedPaths.includes(node.name)) {
      node.hide = false;
      if (node.name === pathsArr[focusIdx].blackListNode) {
        node.isBlack = true;
      }
    } else {
      node.hide = true;
    }
  });
}

// 查看是否一度关联
export function findOneLevelNodes(node, ary) {
  for (const nodeItem of ary) {
    if (nodeItem === node.id) {
      return true;
    }
  }
  return false;
}
// 查看是否一度关联,名字
export function findOneLevelNodesByName(node, ary) {
  for (const nodeItem of ary) {
    if (nodeItem === node.name) {
      return true;
    }
  }
  return false;
}

// 获取当前网络图的nodeId和linkId
export function getCurrentNodesLinks(forceNetwork) {
  const output = {
    nodes: [],
    links: []
  };
  forceNetwork.nodes.map((node) => {
    output.nodes.push(node.id);
  });
  forceNetwork.links.map((link) => {
    output.links.push(link.id);
  });
  return output;
}
// 判断连线箭头端节点是公司还是人
export function getArrowType(target, nodes) {
  return nodes[nodes.findIndex((node) => node.id === target.id)].cateType;
}
export function turnToPath(shortestPahth) {
  const pathList = [];
  shortestPahth.forEach((path)=>{
    for (let idx = 0; idx < path.length - 1; idx ++) {
      pathList.push(`${path[idx]}-${path[idx + 1]}`);
    }
  });
  return pathList;
}
export function focusShortPath(shortestPahth, edgesData) {
  const pathList = turnToPath(shortestPahth);
  edgesData.forEach((link)=>{
    const relName1 = `${link.target.name}-${link.source.name}`;
    const relName2 = `${link.source.name}-${link.target.name}`;
    const idx = pathList.findIndex((pathName)=>{
      return pathName === relName1 || pathName === relName2;
    });
    if (idx > -1) {
      link.isFocus = true;
    } else {
      link.isFocus = false;
    }
  });
}
