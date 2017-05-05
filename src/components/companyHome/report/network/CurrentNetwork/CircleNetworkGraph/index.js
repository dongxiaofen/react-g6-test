import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS, reaction } from 'mobx';
import styles from './index.less';
import * as d3 from 'd3';
import * as svgTools from 'helpers/svgTools';
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
const blingArr = [bling1, bling2, bling3, bling4, bling5, bling6, bling7, bling8, bling9, bling10];
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
let saveNodeXY = false; // 标记坐标存储完成
let centerNodeX;
let centerNodeY;
let nodeAdded = false;
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
    svgTools.getLayerCount(nodesData, layerCount);
    // 计算半径长度
    svgTools.getRadiusArr(radiusArr, layerCount);
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
        return (data.hide && styles.hide) || (data.category === 0 && styles.mainCompany) || (data.blackList && data.category !== 7 && styles.blackListNodes) || (data.status === 0 && styles.cancelNodes) || styles[`category${data.category}`];
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
        if (data.hide) {
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
        return data.isFocus ? styles.show : styles.hide;
      })
      .attr('font-size', 8)
      .attr('fill', '#3483e9')
      .attr('id', (data, idx) => { return 'edgelabel' + idx; });


    svgEdgelabels.append('textPath')
      .attr('xlink:href', (data, idx) => { return '#edgepath' + idx; })
      .style('pointer-events', 'none')
      .text((data) => { return svgTools.getLinkInfo(data); });
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
        svgTools.focusRelatedLinks(focusNodeName, edgesData);
        simulation.restart();
      }
    );
    // 监听类别筛选事件
    reaction(
      () => this.props.networkStore.typeList.checkedArrChanged,
      () => {
        const checkedArr = this.props.networkStore.typeList.checkedArr;
        const currentLevel = this.props.networkStore.currentLevel;
        nodesData.map((node) => {
          if (node.cateType !== 0) {
            if (node.layer <= currentLevel) {
              node.hide = svgTools.isNodeShow(checkedArr, node.cateList);
            } else {
              node.hide = true;
            }
          }
        });
        svgTools.updateLinksDisplay(nodesData, edgesData);
        simulation.restart();
      }
    );
  }
  ticked = () => {
    if (!saveNodeXY) { // 只跑一次,然后存到nodeXY
      svgTools.getInitNodeXY(nodeXY, layerCount, nodesData, radiusArr, centerNodeX, centerNodeY);
      saveNodeXY = true;
    } else if (nodeAdded) { // 用户添加新节点
      console.log('添加节点后', nodesData);
      nodeXY = {};
      svgTools.getNewNodeXY(nodesData, nodeXY, centerNodeX, centerNodeY);
      nodeAdded = false;
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
      .attr('y2', (data) => { return data.target.y; })
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.isFocus && styles.focusLink) || styles.links;
      });

    svgNodes
      .attr('cx', (data) => { return data.x; })
      .attr('cy', (data) => { return data.y; })
      .attr('r', (data) => {
        return data.isFocus ? 20 : 12;
      })
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.isFocus && ' ') || (data.category === 0 && styles.mainCompany) || (data.blackList && data.category !== 7 && styles.blackListNodes) || (data.status === 0 && styles.cancelNodes) || styles[`category${data.category}`];
      })
      .attr('fill', (data) => {
        return (!data.isFocus && ' ') || (data.blackList && data.category !== 7 && 'url(#bling9)') || (data.status === 0 && 'url(#bling10)') || `url(#bling${data.category})`;
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
      })
      .attr('class', (data) => {
        return data.hide ? styles.hide : styles.nodeText;
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
        return data.isFocus ? styles.show : styles.hide;
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
    if (!isDragging && data.category !== 0) {
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
            {
              new Array(10).fill(1).map((tmp, idx) => {
                return (
                  <pattern key={tmp + idx} id={`bling${idx + 1}`} patternUnits="objectBoundingBox" width="1" height="1">
                    <image xlinkHref={blingArr[idx]} x="0" y="0" width="40" height="40" />
                  </pattern>
                );
              })
            }
          </defs>
        </svg>
      </div>
    );
  }
}
