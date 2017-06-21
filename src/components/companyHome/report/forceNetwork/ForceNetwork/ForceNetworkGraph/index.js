import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS, reaction } from 'mobx';
import styles from './index.less';
import * as svgTools from 'helpers/svgTools';
import * as d3 from 'd3';
let nodesData;
let edgesData;

let linkG;
let nodeG;
let edgepathsG;
let edgelabelsG;
let texts1G;
let texts2G;
let texts3G;
let svgEdges;
let svgNodes;
let svgTexts1;
let svgTexts2;
let svgTexts3;
let svgEdgepaths;
let svgEdgelabels;
let simulation;
let zoom;
let isDragging = false;
let svg;
let group;
let clickTime = '';
let timer = null;
let reactionFoucusNode;
let reactionExpanded;
let reactionDbFocal;
let reactionShortest;
// let dblclikTimer = null;
// nodeStatus 1:active -1灰色 －２灰色变小
@inject('forceNetworkStore', 'routing')
@observer
export default class ForceNetworkGraph extends Component {
  static propTypes = {
    forceNetworkStore: PropTypes.object,
    svgWidth: PropTypes.number,
    svgHeight: PropTypes.number,
    routing: PropTypes.object,
  };
  componentDidMount() {
    // console.log(toJS(this.props.forceNetworkStore.forceNetwork));
    const graph = toJS(this.props.forceNetworkStore.forceNetwork);
    nodesData = graph.nodes;
    edgesData = graph.links;
    zoom = d3.zoom();
    svg = d3.select('svg')
      .call(zoom.on('zoom', () => {
        this.props.forceNetworkStore.updateValue('zoomIndex', d3.event.transform.k);
        group.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
      }))
      .on('dblclick.zoom', () => { });
    group = svg.append('g').attr('id', 'whole');
    const width = d3.select('svg').attr('width');
    const height = d3.select('svg').attr('height');
    simulation = d3.forceSimulation(nodesData)
      .force('charge', d3.forceManyBody().strength(-2000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(edgesData).id((data) => { return data.id; }).distance(150))
      // .force('collide', d3.forceCollide(58).iterations(16).radius((data) => { return data.isActive === 0 ? 20 : 70; }))
      .force('x', d3.forceX(0))
      .force('y', d3.forceY(0))
      .on('tick', this.ticked);

    linkG = group.append('g').attr('id', 'lines');
    nodeG = group.append('g').attr('id', 'nodes');
    texts1G = group.append('g').attr('id', 'texts1');
    texts2G = group.append('g').attr('id', 'texts2');
    texts3G = group.append('g').attr('id', 'texts3');
    edgepathsG = group.append('g').attr('id', 'linePaths');
    edgelabelsG = group.append('g').attr('id', 'lineLabels');
    this.reDraw();
    setTimeout(() => {
      nodesData.map((node) => {
        node.hide = false;
      });
      edgesData.map((link) => {
        link.hide = false;
      });
      simulation.restart();
    }, 2000);
    // 监听点击和搜索节点事件
    reactionFoucusNode = reaction(
      () => this.props.forceNetworkStore.focalNode,
      () => {
        this.props.forceNetworkStore.resetNodeInfo();
        if (nodesData !== '') {
          const { focalNode } = this.props.forceNetworkStore;
          if (focalNode.name) {
            nodesData.map((node) => {
              if (focalNode.name === node.name) {
                node.nodeStatus = 1;
              } else if (svgTools.findOneLevelNodes(node, focalNode.oneLevelLinkedNodes)) {
                node.nodeStatus = 1;
              } else {
                node.nodeStatus = -1;
              }
            });
            this.getNodeInfo(focalNode);
          } else {
            nodesData.map((node) => {
              node.nodeStatus = 1;
            });
          }
          simulation.restart();
        }
      }
    );
    // 监听拓展事件
    reactionExpanded = reaction(
      () => this.props.forceNetworkStore.expandNetwork.change,
      () => {
        const { nodes, links } = this.props.forceNetworkStore.expandNetwork;
        nodesData = nodesData.concat(toJS(nodes));
        edgesData = edgesData.concat(toJS(links));
        this.reDraw();
        setTimeout(() => {
          nodesData.map((node) => {
            node.hide = false;
          });
          edgesData.map((link) => {
            link.hide = false;
          });
          simulation.restart();
        }, 2000);
      }
    );
    // 监听聚焦事件
    reactionDbFocal = reaction(
      () => this.props.forceNetworkStore.dbFocalNode,
      () => {
        this.props.forceNetworkStore.resetNodeInfo();
        const { dbFocalNode } = this.props.forceNetworkStore;
        if (dbFocalNode.id) {
          nodesData.map((node) => {
            if (node.id === dbFocalNode.id) {
              node.nodeStatus = 1;
            } else if (svgTools.findOneLevelNodes(node, dbFocalNode.oneLevelLinkedNodes)) {
              node.nodeStatus = 1;
            } else {
              node.nodeStatus = -2;
            }
          });
          this.getNodeInfo(dbFocalNode);
          this.getShortPath(dbFocalNode);
        } else {
          nodesData.map((node) => {
            node.nodeStatus = 1;
          });
        }
        this.modifySimulation();
      }
    );
    // 监听最短路径
    reactionShortest = reaction(
      () => this.props.forceNetworkStore.shortestPahth,
      () => {
        const { dbFocalNode, focalNode, shortestPahth} = this.props.forceNetworkStore;
        if (dbFocalNode.id) {
          nodesData.map((node) => {
            if (svgTools.findShortPath(node.id, shortestPahth)) {
              node.nodeStatus = 1;
            }
            simulation.restart();
          });
        } else if (focalNode.id) {
          // 单击,高亮最短路径,暗掉其他路径
          nodesData.map((node) => {
            if (svgTools.findShortPath(node.id, shortestPahth)) {
              node.nodeStatus = 1;
            } else {
              node.nodeStatus = -1;
            }
          });
          simulation.restart();
        }
      }
    );
  }
  componentWillUnmount() {
    if (simulation) {
      simulation.stop(); // 停止网络图计算
    }
    reactionFoucusNode();
    reactionExpanded();
    reactionDbFocal();
    reactionShortest();
  }
  getNodeInfo = (focalNode) => {
    if (focalNode.cateType === 1) {
      const { monitorId } = this.props.routing.location.query;
      this.props.forceNetworkStore.getCompNodeInfo(monitorId, { companyName: focalNode.name });
    } else if (focalNode.cateType === 2) {
      const { monitorId } = this.props.routing.location.query;
      this.props.forceNetworkStore.getPersonNodeInfo(monitorId, { personId: focalNode.id });
    }
  }
  getShortPath = (nodeInfo) => {
    if (nodeInfo.id) {
      const { monitorId } = this.props.routing.location.query;
      const source = this.props.forceNetworkStore.centerNode.id;
      const target = nodeInfo.id;
      const currentNetwork = svgTools.getCurrentNodesLinks(this.props.forceNetworkStore.forceNetwork);
      this.props.forceNetworkStore.getShortPath(monitorId, { source, target, currentNetwork });
    }
  };
  // 当有元素变动的时候重绘关联图
  reDraw = () => {
    simulation.nodes(nodesData);
    simulation.force('link').links(edgesData);
    // nodes
    svgNodes = nodeG
      .selectAll('circle')
      .data(nodesData, (data) => data.id);
    svgNodes.exit().remove();
    const nodeEnter = svgNodes.enter();
    nodeEnter
      .append('circle')
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.cateType === 0 && styles.mainCompany) || (data.status === 0 && styles.cancelNodes) || (data.cateType === 1 && styles.relativeCompany) || (data.cateType === 2 && styles.relativePerson);
      })
      .attr('r', (data) => data.cateType < 2 ? 38 : 28)
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended))
      .append('title')
      .text((data) => { return data.name; });

    svgNodes = nodeEnter
      .merge(svgNodes);
    // texts
    svgTexts1 = texts1G.selectAll('text').data(nodesData, (data) => data.id);
    svgTexts1.exit().remove();
    const texts1Enter = svgTexts1.enter()
      .append('text')
      .attr('class', (data) => {
        return data.hide ? styles.hide : styles.nodeText;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', (data) => {
        return data.name.length < 4 ? '0em' : '-1em';
      })
      .text((data) => {
        return data.name.substring(0, 3);
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended))
      .append('title')
      .text((data) => { return data.name; });
    svgTexts1 = texts1Enter.merge(svgTexts1);

    svgTexts2 = texts2G.selectAll('text').data(nodesData, (data) => data.id);
    svgTexts2.exit().remove();
    const texts2Enter = svgTexts2.enter()
      .append('text')
      .attr('class', (data) => {
        return data.hide ? styles.hide : styles.nodeText;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', () => {
        return '1em';
      })
      .text((data) => {
        return data.name.substring(3, 8);
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended))
      .append('title')
      .text((data) => { return data.name; });
    svgTexts2 = texts2Enter.merge(svgTexts2);
    // .merge(svgTexts2);

    svgTexts3 = texts3G.selectAll('text').data(nodesData, (data) => data.id);
    svgTexts3.exit().remove();
    const texts3Enter = svgTexts3.enter()
      .append('text')
      .attr('class', (data) => {
        return data.hide ? styles.hide : styles.nodeText;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '2em')
      .text((data) => {
        return data.name.length > 8 ? '...' : '';
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended))
      .append('title')
      .text((data) => { return data.name; });
    svgTexts3 = texts3Enter.merge(svgTexts3);
    // links
    svgEdges = linkG
      .selectAll('line')
      .data(edgesData, (data) => data.id);
    svgEdges.exit().remove();
    const linkEnter = svgEdges
      .enter()
      .append('line')
      .attr('class', (data) => (data.hide && styles.hide) || (data.lineType === 1 && styles.links) || styles.dashLinks)
      .attr('marker-end', (data) => (data.lineType === 2 && '') || (svgTools.getArrowType(data.target, nodesData) < 2 && 'url(#cArrow)') || 'url(#pArrow)');
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
        return data.hide ? styles.hide : styles.linkLabel;
      })
      .attr('dx', 60)
      .attr('dy', -2)
      .attr('id', (data, idx) => { return 'edgelabel' + idx; })
      .append('textPath')
      .attr('xlink:href', (data, idx) => { return '#edgepath' + idx; })
      .style('pointer-events', 'none')
      .text((data) => data.lineName);
    svgEdgelabels = edgelabelsEnter.merge(svgEdgelabels);

    // Update and restart the simulation.
    simulation.alpha(1).restart();
  }
  modifySimulation = () => {
    simulation
      .alpha(0.3)
      .force('charge', d3.forceManyBody().strength((data) => {
        if (data.nodeStatus === -2) {
          return -500;
        }
        return -2000;
      }))
      .force('link', d3.forceLink(edgesData).id((data) => { return data.name; }).distance((data) => {
        if (data.target.nodeStatus === -2 || data.source.nodeStatus === -2) {
          return 90;
        }
        return 150;
      }))
      .restart();
  }
  ticked = () => {
    d3.selectAll('circle')
      .attr('cx', (data) => { return data.x; })
      .attr('cy', (data) => { return data.y; })
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.nodeStatus < 0 && styles.noActive) || (data.cateType === 0 && styles.mainCompany) || (data.status === 0 && styles.cancelNodes) || (data.cateType === 1 && styles.relativeCompany) || (data.cateType === 2 && styles.relativePerson);
      })
      // .attr('fill', (data) => {
      //   return (!data.isFocus && ' ') || (data.blackList && data.category !== 7 && 'url(#bling9)') || (data.status === 0 && 'url(#bling10)') || `url(#bling${data.category})`;
      // })
      .transition()
      .duration(100)
      .attr('r', (data) => {
        if (data.nodeStatus === -2) {
          return 10;
        }
        return data.cateType < 2 ? 38 : 28;
      });

    d3.selectAll('line')
      .attr('x1', (data) => { return data.source.x; })
      .attr('y1', (data) => { return data.source.y; })
      .attr('x2', (data) => { return data.target.x; })
      .attr('y2', (data) => { return data.target.y; })
      .attr('class', (data) => {
        return (data.hide && styles.hide) || ((data.source.nodeStatus < 0 || data.target.nodeStatus < 0) && styles.lineNoActive) || (data.lineType === 1 && styles.links) || styles.dashLinks;
      });
    d3.selectAll('#texts1 text')
      .attr('x', (data) => { return data.x; })
      .attr('y', (data) => { return data.y; })
      .attr('class', (data) => {
        return data.nodeStatus === -2 ? styles.hideText : styles.nodeText;
      });
    d3.selectAll('#texts2 text')
      .attr('x', (data) => { return data.x; })
      .attr('y', (data) => { return data.y; })
      .attr('class', (data) => {
        return data.nodeStatus === -2 ? styles.hideText : styles.nodeText;
      });

    d3.selectAll('#texts3 text')
      .attr('x', (data) => { return data.x; })
      .attr('y', (data) => { return data.y; })
      .attr('class', (data) => {
        return data.nodeStatus === -2 ? styles.hideText : styles.nodeText;
      });

    d3.selectAll('.edgepath')
      .attr('d', (data) => {
        return 'M ' + data.source.x + ' ' + data.source.y + ' L ' + data.target.x + ' ' + data.target.y;
      });

    d3.selectAll('#lineLabels text')
      .attr('transform', function autoRotate(data) {
        if (data.target.x < data.source.x) {// 边上的文字自动转向
          const bbox = this.getBBox();
          const rx = bbox.x + bbox.width / 2;
          const ry = bbox.y + bbox.height / 2;
          return 'rotate(180 ' + rx + ' ' + ry + ')';
        }
        return 'rotate(0)';
      })
      .attr('class', (data) => {
        return (data.hide && styles.hideLinksText) || ((data.source.nodeStatus < 0 || data.target.nodeStatus < 0) && styles.hideLinksText) || styles.linkLabel;
      });
  }
  dragstarted = (data) => {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    // console.log(data, '开始拖拽');
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
      if (clickTime) {// 双击
        if (timer) {
          clearTimeout(timer);
        }
        clickTime = '';
        this.props.forceNetworkStore.setFocalNode(data);
        data.fx = null;
        data.fx = null;
      } else {
        const { dbFocalNode } = this.props.forceNetworkStore;
        const date = new Date();
        clickTime = date;
        timer = setTimeout(() => {
          if (!dbFocalNode.id) {
            this.props.forceNetworkStore.focusNode(data);
          }
          clickTime = '';
        }, 300);
      }
    } else {
      // console.log(data, '拖拽结束');
    }
    isDragging = false;
    // data.fx = null;
    // data.fx = null;;
  }
  static handleZoom(value, forceNetworkStore) {
    forceNetworkStore.updateValue('zoomIndex', value);
    zoom.scaleTo(svg, value);
  }
  static resetNetWork = (forceNetworkStore)=> {
    svg.call(zoom.transform, d3.zoomIdentity);
    forceNetworkStore.resetNetWork();
  };
  render() {
    return (
      <div>
        <svg width={this.props.svgWidth} height={this.props.svgHeight} >
          <defs>
            <marker id="cArrow"
              markerUnits="userSpaceOnUse"
              markerWidth="10"
              markerHeight="10"
              viewBox="0 0 12 12"
              refX="57"
              refY="6"
              orient="auto">
              <path d="M2,2 L10,6 L2,10 L6,6 L2,2" className={styles.arrow} />
            </marker>
            <marker id="pArrow"
              markerUnits="userSpaceOnUse"
              markerWidth="10"
              markerHeight="10"
              viewBox="0 0 12 12"
              refX="47"
              refY="6"
              orient="auto">
              <path d="M2,2 L10,6 L2,10 L6,6 L2,2" className={styles.arrow} />
            </marker>
          </defs>
        </svg>
      </div>
    );
  }
}
