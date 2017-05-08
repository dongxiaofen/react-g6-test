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
    } else {
      description.push(`${key}(${relation[key][0]})`);
    }
  });
  return description.join(',');
}
// 风险关系获取边的关系
export function getBlackLinkInfo(data) {
  const description = [];
  const relation = data.relation;
  Object.keys(relation).map((key) => {
    if (key === '股东' && data.invRatio !== -1) {
      const invCurrency = (data.invCurrency === '人民币' || data.invCurrency === '') ? '万人民币' : data.invCurrency;
      description.push(`${relation[key][0]}(投资金额: ${data.invConum + invCurrency},投资比例: ${data.invRatio.toFixed(2)}%)`);
    } else {
      description.push(`${key}(${relation[key][0]})`);
    }
  });
  return description.join(',');
}
