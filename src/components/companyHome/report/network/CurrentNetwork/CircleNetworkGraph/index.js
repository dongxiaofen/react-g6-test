import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS, reaction } from 'mobx';
import styles from './index.less';
import * as d3 from 'd3';
import bling1 from 'imgs/companyHome/network/1.gif';
import bling2 from 'imgs/companyHome/network/2.gif';
import bling3 from 'imgs/companyHome/network/3.gif';
import bling4 from 'imgs/companyHome/network/4.gif';
import bling5 from 'imgs/companyHome/network/5.gif';
import bling6 from 'imgs/companyHome/network/6.gif';
import bling7 from 'imgs/companyHome/network/7.gif';
import bling8 from 'imgs/companyHome/network/8.gif';
import bling9 from 'imgs/companyHome/network/9.gif';
import bling10 from 'imgs/companyHome/network/10.gif';
let nodesData;
let edgesData;
let svgEdges;
let svgNodes;
let svgEdgepaths;
let svgEdgelabels;
let svgTexts;
let simulation;
let zoom;
let isDragging = false;
const layerCount = {}; // 存储各层的节点数
const radiusArr = []; // 存储半径长度
let nodeXY = {}; // 存储同心圆各节点坐标
let centerNodeX;
let centerNodeY;
let nodeAdded = false;
let saveNodeXY = false;

@inject('networkStore')
@observer
export default class CircleNetworkGraph extends Component {
  static propTypes = {
    networkStore: PropTypes.object,
    svgWidth: PropTypes.number,
    svgHeight: PropTypes.number,
  };

  componentDidMount() {
    // console.log(toJS(this.props.networkStore), 'componentDidMount');
    const graph = toJS(this.props.networkStore.currentNetwork);
    nodesData = graph.nodes;
    edgesData = graph.links;
    // 统计各层的节点数
    this.getLayerCount();
    // 计算半径长度
    this.getRadiusArr();
    // console.log('radiusArr', radiusArr, layerCount);
    zoom = d3.zoom();
    const svg = d3.select('svg')
      .call(zoom.on('zoom', () => {
        // console.log(d3.event.transform);
        svg.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
      }))
      .append('g');
    const width = d3.select('svg').attr('width');
    const height = d3.select('svg').attr('height');
    centerNodeX = width / 2;
    centerNodeY = height / 2;
    // const color = d3.scaleOrdinal(d3.schemeCategory20);

    simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((data) => { return data.name; }))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    simulation
      .nodes(nodesData)
      .on('tick', this.ticked);

    simulation.force('link')
      .links(edgesData);
    svgEdges = svg.append('g')
      .attr('class', styles.links)
      .selectAll('line')
      .data(edgesData)
      .enter().append('line')
      .attr('marker-end', 'url(#mainArrow)');
    // .attr('stroke-width', (data) => { return Math.sqrt(data.value); });

    svgNodes = svg.append('g')
      .attr('class', styles.nodes)
      .selectAll('circle')
      .data(nodesData)
      .enter().append('circle')
      .attr('r', 12)
      .attr('class', (data) => {
        let res;
        if (data.show === 0) {
          res = styles.hide;
        } else if (data.category === 0) {
          res = styles.mainCompany;
        } else if (data.blackList && data.category !== 7) {
          res = styles.blackListNodes;
        } else if (data.status === 0) {
          res = styles.cancelNodes;
        } else {
          res = styles[`category${data.category}`];
        }
        return res;
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended));

    svgNodes.append('title')
      .text((data) => { return data.category === 0 ? data.name : '单击查看详情'; });

    svgTexts = svg.selectAll('text')
      .data(nodesData)
      .enter()
      .append('text')
      .attr('class', (data) => {
        if (data.show === 0) {
          return styles.hide;
        }
        return styles.nodeText;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', (data) => {
        return data.cateType === 0 ? 45 : 25;
      })
      .text((data) => {         // 返回节点的名字
        return data.name;
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended));

    svgEdgepaths = svg.selectAll('.edgepath')
      .data(edgesData)
      .enter()
      .append('path')
      .attr('d', (data) => { return 'M ' + data.source.x + ' ' + data.source.y + ' L ' + data.target.x + ' ' + data.target.y; })
      .attr('class', 'edgepath')
      .attr('id', (data, idx) => { return 'edgepath' + idx; })
      .style('pointer-events', 'none');

    svgEdgelabels = svg.selectAll('.edgelabel')
      .data(edgesData)
      .enter()
      .append('text')
      .style('pointer-events', 'none')
      .attr('dx', 40)
      .attr('dy', -2)
      .attr('class', (data) => {
        return data.showInfo ? styles.show : styles.hide;
      })
      .attr('font-size', 8)
      .attr('fill', '#aaa')
      .attr('id', (data, idx) => { return 'edgelabel' + idx; });


    svgEdgelabels.append('textPath')
      .attr('xlink:href', (data, idx) => { return '#edgepath' + idx; })
      .style('pointer-events', 'none')
      .text((data) => { return this.getLinkInfo(data); });
    // 监听点击和搜索节点事件
    reaction(
      () => this.props.networkStore.focusNodeName,
      () => {
        const { focusNodeName } = this.props.networkStore;
        nodesData.map((node) => {
          node.isFocus = false;
        });
        nodesData.map((node) => {
          if (focusNodeName !== '' && node.name.indexOf(focusNodeName) >= 0 && node.category !== 0) {
            node.isFocus = true;
          }
        });
        // edgesData[0].showInfo = true;
        this.reDraw();
      }
    );
  }
  // 获取边的关系
  getLinkInfo = (data) => {
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
  // 获取最小半径公式
  getRadius = (nodeCount, nodeRadius = 25) => {
    return nodeRadius / Math.sin(Math.PI / nodeCount);
  }
  // 统计各层的节点数
  getLayerCount = () => {
    nodesData.map((node) => {
      if (layerCount[node.layer] === undefined) {
        layerCount[node.layer] = 1;
      } else {
        layerCount[node.layer]++;
      }
    });
  }
  // 计算半径长度
  getRadiusArr = () => {
    Object.keys(layerCount).map((key) => {
      if (key > 0) {
        const defaultRadius = key === '1' ? 150 : radiusArr[key - 2] + 100;
        if (layerCount[key] === 1) { // 只有一个关联节点
          radiusArr.push(defaultRadius);
        } else {
          radiusArr.push(Math.max(defaultRadius, this.getRadius(layerCount[key])));
        }
      }
    });
  }
  // 获取所有节点坐标
  getNodeXY = () => {
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
    saveNodeXY = true;
  }
  // 用户添加新节点后重新计算所有节点坐标
  getNewNodeXY = () => {
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
          newRadiusArr.push(Math.max(defaultRadius, this.getRadius(newLayerCount[key])));
        }
      }
    });
    nodeXY = {};
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
    nodeAdded = false;
  }
  ticked = () => {
    if (!saveNodeXY) { // 只跑一次,然后存到nodeXY
      this.getNodeXY();
    } else if (nodeAdded) { // 用户添加新节点
      console.log('添加节点后', nodesData);
      this.getNewNodeXY();
    } else {
      nodesData.forEach((node) => {
        if (node.layer === 0) {
          node.x = centerNodeX;
          node.y = centerNodeY;
        } else if (node.dragged !== 1) {
          node.x = nodeXY[node.index].x;
          node.y = nodeXY[node.index].y;
        }
      });
    }

    svgEdges
      .attr('x1', (data) => { return data.source.x; })
      .attr('y1', (data) => { return data.source.y; })
      .attr('x2', (data) => { return data.target.x; })
      .attr('y2', (data) => { return data.target.y; });

    svgNodes
      .attr('cx', (data) => { return data.x; })
      .attr('cy', (data) => { return data.y; })
      .attr('r', (data)=>{
        return data.isFocus ? 20 : 12;
      })
      .attr('class', (data) => {
        let res;
        if (data.show === 0) {
          res = styles.hide;
        } else if (data.isFocus) {
          res = '';
        } else if (data.category === 0) {
          res = styles.mainCompany;
        } else if (data.blackList && data.category !== 7) {
          res = styles.blackListNodes;
        } else if (data.status === 0) {
          res = styles.cancelNodes;
        } else {
          res = styles[`category${data.category}`];
        }
        return res;
      })
      .attr('fill', (data) => {
        let res;
        if (data.blackList && data.category !== 7) {
          res = 'url(#bling9)';
        } else if (data.status === 0) {
          res = 'url(#bling10)';
        } else {
          res = `url(#bling${data.category})`;
        }
        return data.isFocus ? res : '';
      });

    svgTexts
      .attr('x', (data) => {
        if (data.layer !== -1) {
          return data.x;
        }
      })
      .attr('y', (data) => {
        if (data.layer !== -1) {
          return data.y;
        }
      });

    svgEdgepaths.attr('d', (data) => {
      const path = 'M ' + data.source.x + ' ' + data.source.y + ' L ' + data.target.x + ' ' + data.target.y;
      return path;
    });

    svgEdgelabels.attr('transform', function autoRotate(data) {
      if (data.target.x < data.source.x) {// 边上的文字自动转向
        const bbox = this.getBBox();
        const rx = bbox.x + bbox.width / 2;
        const ry = bbox.y + bbox.height / 2;
        return 'rotate(180 ' + rx + ' ' + ry + ')';
      }
      return 'rotate(0)';
    })
      .attr('class', (data) => {
        return data.showInfo ? styles.show : styles.hide;
      });
  }
  dragstarted = (data) => {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    // console.log(data, '开始拖拽');
    nodesData[nodesData.findIndex((node) => node.index === data.index)].dragged = 1; // 允许拖拽
    data.fx = data.x;
    data.fy = data.y;
  }

  dragged = (data) => {
    isDragging = true;
    // console.log(data, '拖拽。。。');
    data.fx = d3.event.x;
    data.fy = d3.event.y;
  }

  dragended = (data) => {
    if (!d3.event.active) simulation.alphaTarget(0);
    if (!isDragging) {
      this.props.networkStore.focusNode(data.name);
      console.log(data, '单击');
    } else {
      // console.log(data, '拖拽结束');
    }
    isDragging = false;
    // data.fx = null;
    // data.fy = null;
  }

  // 重绘网络图
  reDraw = () => {
    // const checkedArr = this.props.currentNetwork.getIn(['typeList', 'checkedArr']).toArray();
    // 连线
    svgEdges = svgEdges.data(simulation.force('link').links());
    // update
    svgEdges
      .attr('class', (data) => {
        let res;
        if (data.show === 0) {
          res = styles.hide;
        } else if (data.focus === 1) {
          res = styles.focusLink;
        } else {
          res = styles.links;
        }
        return res;
      });
    // .attr('marker-end', (data)=>{
    //   return data.show === 1 ? 'url(#relativeArrow)' : 'url(#mainArrow)';
    // });
    // enter
    svgEdges.enter()
      .append('line')
      .attr('class', styles.links)
      .attr('marker-end', () => {
        return 'url(#relativeArrow)';
      });
    // exit
    svgEdges.exit().remove();

    // 节点
    svgNodes = svgNodes.data(simulation.nodes());
    // update
    // svgNodes.attr('r', (data) => {
    //   let res;
    //   if (data.isFocus === 1) {
    //     res = 20;
    //   } else {
    //     res = data.cateType === 0 ? 30 : 12;
    //   }
    //   return res;
    // })
    //   .attr('class', (data) => {
    //     let res;
    //     if (data.show === 0) {
    //       res = styles.hide;
    //     } else if (data.isFocus) {
    //       res = '';
    //     } else if (data.category === 0) {
    //       res = styles.mainCompany;
    //     } else if (data.blackList && data.category !== 7) {
    //       res = styles.blackListNodes;
    //     } else if (data.status === 0) {
    //       res = styles.cancelNodes;
    //     } else {
    //       res = styles[`category${data.category}`];
    //     }
    //     return res;
    //   })
    //   .attr('fill', (data) => {
    //     let res;
    //     if (data.blackList && data.category !== 7) {
    //       res = 'url(#bling9)';
    //     } else if (data.status === 0) {
    //       res = 'url(#bling10)';
    //     } else {
    //       res = `url(#bling${data.category})`;
    //     }
    //     return data.isFocus ? res : '';
    //   })
    //   .call(d3.drag()
    //     .on('start', this.dragstarted)
    //     .on('drag', this.dragged)
    //     .on('end', this.dragended));
    // enter
    svgNodes.enter().append('circle')
      .attr('r', 12)
      .attr('class', (data) => {
        let res;
        if (data.blackList && data.category !== 7) {
          res = styles.blackListNodes;
        } else if (data.status === 0) {
          res = styles.cancelNodes;
        }
        return res;
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended));
    // exit
    svgNodes.exit().remove();

    // 文字描述
    svgTexts = svgTexts.data(simulation.nodes());
    // update
    svgTexts.attr('class', (data) => {
      return data.show === 0 ? styles.hide : styles.nodeText;
    });
    // enter
    svgTexts.enter().append('text')
      .attr('class', styles.text)
      .attr('text-anchor', 'middle')
      .attr('dy', 25)
      .text((data) => {         // 返回节点的名字
        return data.name;
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended));
    // exit
    svgTexts.exit().remove();
    simulation.restart();
  }
  render() {
    return (
      <div className={styles.svgBox}>
        <svg width={this.props.svgWidth} height={this.props.svgHeight} >
          <defs>
            <marker id="mainArrow"
              markerUnits="userSpaceOnUse"
              markerWidth="10"
              markerHeight="10"
              viewBox="0 0 12 12"
              refX="25"
              refY="6"
              orient="auto">
              <path d="M2,2 L10,6 L2,10 L6,6 L2,2" className={styles.arrow} />
            </marker>
            <marker id="relativeArrow"
              markerUnits="userSpaceOnUse"
              markerWidth="10"
              markerHeight="10"
              viewBox="0 0 12 12"
              refX="30"
              refY="6"
              orient="auto">
              <path d="M2,2 L10,6 L2,10 L6,6 L2,2" className={styles.arrow} />
            </marker>
            <pattern id="bling1" patternUnits="objectBoundingBox" width="1" height="1">
              <image xlinkHref={bling1} x="0" y="0" width="40" height="40" />
            </pattern>
            <pattern id="bling2" patternUnits="objectBoundingBox" width="1" height="1">
              <image xlinkHref={bling2} x="0" y="0" width="40" height="40" />
            </pattern>
            <pattern id="bling3" patternUnits="objectBoundingBox" width="1" height="1">
              <image xlinkHref={bling3} x="0" y="0" width="40" height="40" />
            </pattern>
            <pattern id="bling4" patternUnits="objectBoundingBox" width="1" height="1">
              <image xlinkHref={bling4} x="0" y="0" width="40" height="40" />
            </pattern>
            <pattern id="bling5" patternUnits="objectBoundingBox" width="1" height="1">
              <image xlinkHref={bling5} x="0" y="0" width="40" height="40" />
            </pattern>
            <pattern id="bling6" patternUnits="objectBoundingBox" width="1" height="1">
              <image xlinkHref={bling6} x="0" y="0" width="40" height="40" />
            </pattern>
            <pattern id="bling7" patternUnits="objectBoundingBox" width="1" height="1">
              <image xlinkHref={bling7} x="0" y="0" width="40" height="40" />
            </pattern>
            <pattern id="bling8" patternUnits="objectBoundingBox" width="1" height="1">
              <image xlinkHref={bling8} x="0" y="0" width="40" height="40" />
            </pattern>
            <pattern id="bling9" patternUnits="objectBoundingBox" width="1" height="1">
              <image xlinkHref={bling9} x="0" y="0" width="40" height="40" />
            </pattern>
            <pattern id="bling10" patternUnits="objectBoundingBox" width="1" height="1">
              <image xlinkHref={bling10} x="0" y="0" width="40" height="40" />
            </pattern>
          </defs>
        </svg>
      </div>
    );
  }
}
