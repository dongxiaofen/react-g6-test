import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS, reaction } from 'mobx';
import styles from './index.less';
import * as d3 from 'd3';
import * as svgTools from 'helpers/svgTools';
import bling0 from 'imgs/companyHome/network/0.gif';
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
const blingArr = [bling0, bling1, bling2, bling3, bling4, bling5, bling6, bling7, bling8, bling9, bling10];
let nodesData;
let edgesData;
let svgEdges;
let svgNodes;
let svgEdgepaths;
let svgEdgelabels;
let svgTexts;
let simulation;
let zoom;
let svg;
let group;
let linkG;
let nodeG;
let edgepathsG;
let edgelabelsG;
let textsG;
let isDragging = false;
let layerCount = {}; // 存储各层的节点数
let radiusArr = []; // 存储半径长度
let nodeXY = {}; // 存储同心圆各节点坐标
let saveNodeXY = false; // 标记坐标存储完成
let centerNodeX; // 中心节点X坐标
let centerNodeY; // 中心节点Y坐标
let nodeAdded = false; // 用户是否新增了节点
let reactionFocusNodeName;
let reactionCheckedArrChanged;
let reactionCurrentLevel;
let reactionShortPath;

@inject('networkStore')
@observer
export default class CircleNetworkGraph extends Component {
  static propTypes = {
    networkStore: PropTypes.object,
    svgWidth: PropTypes.number,
    svgHeight: PropTypes.number,
  };
  componentDidMount() {
    // console.log({ nodeXY, saveNodeXY }, 'currentnetwork didMount');
    const graph = toJS(this.props.networkStore.currentNetwork);
    nodesData = graph.nodes;
    edgesData = graph.links;
    // 统计各层的节点数
    svgTools.getLayerCount(nodesData, layerCount);
    // 计算半径长度
    svgTools.getRadiusArr(radiusArr, layerCount);
    // console.log('radiusArr', radiusArr, layerCount);
    zoom = d3.zoom();
    svg = d3.select('svg')
      .call(zoom.on('zoom', () => {
        // console.log(d3.event.transform, 12312321);
        group.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
      }));
    group = svg.append('g').attr('id', 'whole');
    const width = d3.select('svg').attr('width');
    const height = d3.select('svg').attr('height');
    centerNodeX = width / 2;
    centerNodeY = height / 2;
    // const color = d3.scaleOrdinal(d3.schemeCategory20);

    simulation = d3.forceSimulation(nodesData)
      .force('link', d3.forceLink(edgesData).id((data) => { return data.name; }))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', this.ticked);

    linkG = group.append('g').attr('id', 'lines');
    nodeG = group.append('g').attr('id', 'nodes');
    textsG = group.append('g').attr('id', 'texts');
    edgepathsG = group.append('g').attr('id', 'linePaths');
    edgelabelsG = group.append('g').attr('id', 'lineLabels');
    svgTools.updateLinksDisplay(nodesData, edgesData);
    this.reDraw();
    // 监听点击和搜索节点事件
    reactionFocusNodeName = reaction(
      () => this.props.networkStore.focusNodeName,
      () => {
        if (nodesData !== '') {
          const { focusNodeName } = this.props.networkStore;
          nodesData.map((node) => {
            node.isFocus = false;
            node.isActive = false;
          });
          if (focusNodeName === this.props.networkStore.mainCompanyName) {
            nodesData[0].isFocus = true;
          } else {
            nodesData.map((node) => {
              if (focusNodeName !== '' && node.name === focusNodeName && node.category !== 0) {
                node.isFocus = true;
              }
            });
          }
          svgTools.focusRelatedLinks(focusNodeName, edgesData);
          simulation.restart();
        }
      }
    );
    // 监听类别筛选事件
    reactionCheckedArrChanged = reaction(
      () => this.props.networkStore.typeList.checkedArrChanged,
      () => {
        const checkedArr = this.props.networkStore.typeList.checkedArr;
        if (checkedArr.length > 0 && nodesData !== '') {
          const currentLevel = this.props.networkStore.currentLevel;
          nodesData.map((node) => {
            if (node.cateType !== 0) {
              if (node.layer <= currentLevel) {
                node.hide = !svgTools.isNodeShow(checkedArr, node.cateList);
              } else {
                node.hide = true;
              }
            }
          });
          svgTools.updateLinksDisplay(nodesData, edgesData);
          simulation.restart();
        }
      }
    );
    // 监听level选择变化
    reactionCurrentLevel = reaction(
      () => this.props.networkStore.currentLevel,
      () => {
        const checkedArr = this.props.networkStore.typeList.checkedArr;
        if (checkedArr.length > 0 && nodesData !== '') {
          nodesData.map((node) => {
            if (node.cateType !== 0) {
              if (node.layer <= this.props.networkStore.currentLevel && svgTools.isNodeShow(checkedArr, node.cateList)) {
                node.hide = false;
              } else {
                node.hide = true;
              }
            }
          });
          svgTools.updateLinksDisplay(nodesData, edgesData);
          simulation.restart();
        }
      }
    );
    reactionShortPath = reaction(
      () => this.props.networkStore.shortestPath,
      () => {
        const {shortestPath} = this.props.networkStore;
        svgTools.focusShortPath(shortestPath, edgesData);
        simulation.restart();
      }
    );
  }
  componentWillUnmount() {
    if (simulation) {
      simulation.stop(); // 停止网络图计算
    }
    nodesData = [];
    edgesData = [];
    svgEdges = '';
    svgNodes = '';
    svgTexts = '';
    isDragging = false;
    zoom = '';
    nodeAdded = false;
    saveNodeXY = false;
    nodeXY = {};
    layerCount = {};
    radiusArr = [];
    group = '';
    reactionFocusNodeName();
    reactionCheckedArrChanged();
    reactionCurrentLevel();
    reactionShortPath();
  }
  reDraw = () => {
    simulation.nodes(nodesData);
    simulation.force('link').links(edgesData);
    // nodes
    svgNodes = nodeG
      .selectAll('circle')
      .data(nodesData, (data) => data.name);
    svgNodes.exit().remove();
    const nodeEnter = svgNodes.enter();
    nodeEnter
      .append('circle')
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.category === 0 && styles.mainCompany) || (data.blackList && data.category !== 7 && styles.blackListNodes) || (data.status === 0 && styles.cancelNodes) || styles[`category${data.category}`];
      })
      .attr('r', 12)
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended))
      .append('title')
      .text((data) => { return data.name; });

    svgNodes = nodeEnter
      .merge(svgNodes);
    // texts
    svgTexts = textsG.selectAll('text').data(nodesData, (data) => data.name);
    svgTexts.exit().remove();
    const texts1Enter = svgTexts.enter()
      .append('text')
      .attr('class', (data) => {
        return data.hide ? styles.hide : styles.nodeText;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', (data) => {
        return data.cateType === 0 ? 45 : 25;
      })
      .text((data) => {
        return data.name;
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended))
      .append('title')
      .text((data) => { return data.name; });
    svgTexts = texts1Enter.merge(svgTexts);

    // links
    svgEdges = linkG
      .selectAll('line')
      .data(edgesData, (data) => {
        return data.id;
      });
    svgEdges.exit().remove();
    const linkEnter = svgEdges
      .enter()
      .append('line')
      .attr('class', styles.links);
      // .attr('marker-end', 'url(#mainArrow)');
    svgEdges = linkEnter.merge(svgEdges);
    // labels
    svgEdgepaths = edgepathsG.selectAll('.edgepath').data(edgesData, (data) => data.id);
    svgEdgepaths.exit().remove();
    const edgepathEnter = svgEdgepaths.enter()
      .append('path')
      .attr('class', 'edgepath')
      .attr('id', (data, idx) => { return 'edgepath' + idx; })
      .style('pointer-events', 'none');
    svgEdgepaths = edgepathEnter.merge(svgEdgepaths);

    svgEdgelabels = edgelabelsG.selectAll('.edgelabel').data(edgesData, (data) => data.id);
    svgEdgelabels.exit().remove();
    const edgelabelsEnter = svgEdgelabels.enter()
      .append('text')
      .style('pointer-events', 'none')
      .attr('class', (data) => {
        return data.isFocus ? styles.show : styles.hide;
      })
      .attr('font-size', 8)
      .attr('fill', '#3483e9')
      .attr('dx', 40)
      .attr('dy', -2)
      .attr('id', (data, idx) => { return 'edgelabel' + idx; })
      .append('textPath')
      .attr('xlink:href', (data, idx) => { return '#edgepath' + idx; })
      .style('pointer-events', 'none')
      .text((data) => svgTools.getLinkInfo(data));
    svgEdgelabels = edgelabelsEnter.merge(svgEdgelabels);

    // Update and restart the simulation.
    simulation.alpha(1).restart();
  }
  ticked = () => {
    // console.log('tick');
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

    d3.selectAll('line')
      .attr('x1', (data) => { return data.source.x; })
      .attr('y1', (data) => { return data.source.y; })
      .attr('x2', (data) => { return data.target.x; })
      .attr('y2', (data) => { return data.target.y; })
      // .attr('marker-end', (data)=>{
      //   return data.isFocus ? 'url(#mainArrowAct)' : 'url(#mainArrow)';
      // })
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.isFocus && styles.focusLink) || styles.links;
      });

    d3.selectAll('circle')
      .attr('cx', (data) => { return data.x; })
      .attr('cy', (data) => { return data.y; })
      .attr('r', (data) => {
        return data.isFocus ? 20 : 12;
      })
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.isFocus && ' ') || (data.category === 0 && styles.mainCompany) || (data.blackList && data.category !== 7 && styles.blackListNodes) || (data.status === 0 && styles.cancelNodes) || styles[`category${svgTools.getNodeColor(this.props.networkStore.typeList.checkedArr, data.cateList)}`];
      })
      .attr('fill', (data) => {
        return (!data.isFocus && ' ') || (data.blackList && data.category !== 7 && 'url(#bling9)') || (data.status === 0 && 'url(#bling10)') || `url(#bling${svgTools.getNodeColor(this.props.networkStore.typeList.checkedArr, data.cateList)})`;
      });

    d3.selectAll('#texts text')
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

    d3.selectAll('.edgepath')
      .attr('d', (data) => {
        const path = 'M ' + data.source.x + ' ' + data.source.y + ' L ' + data.target.x + ' ' + data.target.y;
        return path;
      });

    d3.selectAll('#lineLabels text')
      .attr('transform', function autoRotate(data) {
        if (!d3.select(this).attr('class').includes('hide') && data.target.x < data.source.x) {// 边上的文字自动转向， 兼容firefox
          const bbox = this.getBBox();
          const rx = bbox.x + bbox.width / 2;
          const ry = bbox.y + bbox.height / 2;
          return 'rotate(180 ' + rx + ' ' + ry + ')';
        }
        return 'rotate(0)';
      })
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.isFocus && styles.show) || styles.hide;
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
      this.props.networkStore.updateValue('shortestPath', []);
      this.props.networkStore.updateValue('focusNodeInfo', data);
      this.props.networkStore.focusNode(data.name);
      console.log(data, '单击', saveNodeXY);
    } else {
      // console.log(data, '拖拽结束');
    }
    isDragging = false;
    // data.fx = null;
    // data.fy = null;
  }
  static resumeSvg() {
    // zoom.scale([1]);
    // const svg = d3.select('svg g');
    svg.call(zoom.transform, d3.zoomIdentity);
    nodesData.forEach((node) => {
      if (node.layer !== 0) {
        node.fx = nodeXY[node.index].x;
        node.fy = nodeXY[node.index].y;
      }
    });
    simulation.alpha(1).restart();
    // zoom.translateBy(svg, 0, 0);
    // svg.attr('transform', 'translate(0,0) scale(1)');
    // nodesData.map((node)=>{
    //   node.dragged = 0;
    // });
  }
  static fullScreen() {
    const tabContentWrap = d3.select('#tabContentWrap');
    tabContentWrap.attr('class', `${tabContentWrap.attr('class')} ${styles.boxFullScreen}`);
    const svgBox = d3.select('svg');
    svgBox.attr('width', document.body.clientWidth * 3 / 4)
      .attr('height', document.body.clientHeight - 100);
  }
  static exitFull() {
    const oldSvgWidth = document.getElementById('reportContainer').offsetWidth * 3 / 5 - 15;
    const oldSvgHeight = window.screen.height - 280;
    const tabContentWrap = d3.select('#tabContentWrap');
    const svgBox = d3.select('svg');
    tabContentWrap.attr('class', tabContentWrap.attr('class').split(' ')[0]);
    svgBox.attr('class', '')
      .attr('width', oldSvgWidth)
      .attr('height', oldSvgHeight);
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
            <marker id="mainArrowAct"
              markerUnits="userSpaceOnUse"
              markerWidth="10"
              markerHeight="10"
              viewBox="0 0 12 12"
              refX="25"
              refY="6"
              orient="auto">
              <path d="M2,2 L10,6 L2,10 L6,6 L2,2" className={styles.arrowAct} />
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
              new Array(11).fill(1).map((tmp, idx) => {
                return (
                  <pattern key={tmp + idx} id={`bling${idx}`} patternUnits="objectBoundingBox" width="1" height="1">
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
