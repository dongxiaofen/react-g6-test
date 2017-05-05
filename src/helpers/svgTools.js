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
