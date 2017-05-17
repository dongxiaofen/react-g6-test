import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS, reaction } from 'mobx';
import styles from './index.less';
import * as svgTools from 'helpers/svgTools';
import * as d3 from 'd3';

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
// let dblclikTimer = null;
@inject('forceNetworkStore')
@observer
export default class ForceNetworkGraph extends Component {
  static propTypes = {
    forceNetworkStore: PropTypes.object,
    svgWidth: PropTypes.number,
    svgHeight: PropTypes.number
  };
  componentDidMount() {
    // console.log(toJS(this.props.forceNetworkStore.forceNetwork));
    const graph = toJS(this.props.forceNetworkStore.forceNetwork);
    nodesData = graph.nodes;
    edgesData = graph.links;
    zoom = d3.zoom();
    svg = d3.select('svg')
      .call(zoom.on('zoom', () => {
        group.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
      }))
      .on('dblclick.zoom', ()=>{});
    group = svg.append('g').attr('id', 'whole');
    const width = d3.select('svg').attr('width');
    const height = d3.select('svg').attr('height');
    simulation = d3.forceSimulation(nodesData)
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(edgesData).id((data) => { return data.id; }).distance(150))
      // .force('collide', d3.forceCollide(58).iterations(16).radius((data)=>{ return data.isActive === 0 ? 20 : 70;}))
      .force('x', d3.forceX(0))
      .force('y', d3.forceY(0))
      .on('tick', this.ticked);

    svgEdges = group.append('g').attr('id', 'lines').selectAll('.link').attr('marker-end', 'url(#mainArrow)');
    svgNodes = group.append('g').attr('id', 'nodes').selectAll('.node');
    svgTexts1 = group.append('g').attr('id', 'texts1').selectAll('text');
    svgTexts2 = group.append('g').attr('id', 'texts2').selectAll('text');
    svgTexts3 = group.append('g').attr('id', 'texts3').selectAll('text');
    svgEdgepaths = group.append('g').attr('id', 'linePaths').selectAll('.edgepath');
    svgEdgelabels = group.append('g').attr('id', 'lineLabels').selectAll('.edgelabel');
    this.reDraw();
    // 监听点击和搜索节点事件
    reaction(
      () => this.props.forceNetworkStore.focusNodeName,
      () => {
        if (nodesData !== '') {
          const { focusNodeName } = this.props.forceNetworkStore;
          nodesData.map((node) => {
            node.isFocus = false;
          });
          if (focusNodeName === this.props.forceNetworkStore.mainCompanyName) {
            nodesData[0].isFocus = true;
          } else {
            nodesData.map((node) => {
              if (focusNodeName !== '' && node.name.indexOf(focusNodeName) >= 0 && node.category !== 0) {
                node.isFocus = true;
              }
            });
          }
          svgTools.focusRelatedLinks(focusNodeName, edgesData);
          simulation.restart();
        }
      }
    );
    // 监听拓展事件
    reaction(
      () => this.props.forceNetworkStore.expandNetwork.change,
      () => {
        const { nodes, links } = this.props.forceNetworkStore.expandNetwork;
        nodesData = nodesData.concat(toJS(nodes));
        edgesData = edgesData.concat(toJS(links));
        this.reDraw();
      }
    );
    // 监听聚焦事件
    reaction(
      () => this.props.forceNetworkStore.dbFocalNode,
      () => {
        const { dbFocalNode } = this.props.forceNetworkStore;
        nodesData.map((node) => {
          if (node.name === dbFocalNode.name) {
            node.isActive = 1;
          } else if (svgTools.findOneLevelNodes(node, dbFocalNode.OneLevelLinkedNodes)) {
            node.isActive = 2;
          } else {
            node.isActive = 0;
          }
        });
        this.dblclickNode(dbFocalNode);
      }
    );
  }
  // 当有元素变动的时候重绘关联图
  reDraw = () => {
    // nodes
    svgNodes = svgNodes.data(nodesData);
    svgNodes.exit().remove();
    svgNodes = svgNodes.enter()
      .append('circle')
      .attr('r', 35)
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.category === 0 && styles.mainCompany) || (data.blackList && data.category !== 7 && styles.blackListNodes) || (data.status === 0 && styles.cancelNodes) || styles[`category${data.category}`];
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended))
      .merge(svgNodes);

    svgNodes.append('title')
      .text((data) => { return data.name; });

    // texts
    svgTexts1 = svgTexts1.data(nodesData);
    svgTexts1.exit().remove();
    svgTexts1 = svgTexts1.enter()
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
      .merge(svgTexts1);

    svgTexts2 = svgTexts2.data(nodesData);
    svgTexts2.exit().remove();
    svgTexts2 = svgTexts2.enter()
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
      .merge(svgTexts2);

    svgTexts3 = svgTexts3.data(nodesData);
    svgTexts3.exit().remove();
    svgTexts3 = svgTexts3.enter()
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
      .merge(svgTexts3);

    svgTexts1
      .append('title')
      .text((data) => { return data.name; });
    svgTexts2
      .append('title')
      .text((data) => { return data.name; });
    svgTexts3
      .append('title')
      .text((data) => { return data.name; });
    // links
    svgEdges = svgEdges.data(edgesData);
    svgEdges.exit().remove();
    svgEdges = svgEdges.enter()
      .append('line')
      .attr('class', styles.links)
      .attr('marker-end', 'url(#mainArrow)')
      .merge(svgEdges);
    // labels
    svgEdgepaths = svgEdgepaths.data(edgesData);
    svgEdgepaths.exit().remove();
    svgEdgepaths = svgEdgepaths.enter()
      .append('path')
      .attr('class', 'edgepath')
      .attr('id', (data, idx) => { return 'edgepath' + idx; })
      .style('pointer-events', 'none');

    svgEdgelabels = svgEdgelabels.data(edgesData);
    svgEdgelabels.exit().remove();
    svgEdgelabels = svgEdgelabels.enter()
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
      .style('pointer-events', 'none');
      // .text((data) => { return svgTools.getLinkInfo(data); });

    // Update and restart the simulation.
    simulation.nodes(nodesData);
    simulation.force('link').links(edgesData);
    simulation.alpha(1).restart();
  }
  dblclickNode = ()=> {
    simulation
      .force('charge', d3.forceManyBody().strength((data)=>{
        if (data.isActive === 0) {
          return -100;
        }
        return -1000;
      }))
      .force('link', d3.forceLink(edgesData).id((data) => { return data.name; }).distance((data)=>{
        if (data.target.isActive === 0 || data.source.isActive === 0) {
          return 90;
        }
        return 150;
      }))
      .restart();
  }
  ticked = () => {
    svgNodes
      .attr('cx', (data) => { return data.x; })
      .attr('cy', (data) => { return data.y; })
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.isFocus && ' ') || (data.isActive === 0 && styles.noActive) || (data.category === 0 && styles.mainCompany) || (data.blackList && data.category !== 7 && styles.blackListNodes) || (data.status === 0 && styles.cancelNodes) || styles[`category${data.category}`];
      })
      .attr('fill', (data) => {
        return (!data.isFocus && ' ') || (data.blackList && data.category !== 7 && 'url(#bling9)') || (data.status === 0 && 'url(#bling10)') || `url(#bling${data.category})`;
      })
      .transition()
      .duration(100)
      .attr('r', (data) => {
        if (data.isActive === 0) {
          return 10;
        }
        return data.isFocus ? 20 : 35;
      });

    svgEdges
      .attr('x1', (data) => { return data.source.x; })
      .attr('y1', (data) => { return data.source.y; })
      .attr('x2', (data) => { return data.target.x; })
      .attr('y2', (data) => { return data.target.y; })
      .attr('class', (data)=> {
        return ((data.source.isActive === 0 || data.target.isActive === 0) && styles.lineNoActive) || styles.links;
      });

    svgTexts1
      .attr('x', (data) => { return data.x; })
      .attr('y', (data) => { return data.y; })
      .attr('class', (data)=> {
        return data.isActive === 0 ? styles.hideText : styles.nodeText;
      });
    svgTexts2
      .attr('x', (data) => { return data.x; })
      .attr('y', (data) => { return data.y; })
      .attr('class', (data)=> {
        return data.isActive === 0 ? styles.hideText : styles.nodeText;
      });

    svgTexts3
      .attr('x', (data) => { return data.x; })
      .attr('y', (data) => { return data.y; })
      .attr('class', (data)=> {
        return data.isActive === 0 ? styles.hideText : styles.nodeText;
      });

    svgEdgepaths
      .attr('d', (data) => {
        return 'M ' + data.source.x + ' ' + data.source.y + ' L ' + data.target.x + ' ' + data.target.y;
      });

    svgEdgelabels
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
        return data.isFocus ? styles.show : styles.hide;
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
        const date = new Date();
        clickTime = date;
        timer = setTimeout(()=>{
          console.log('单击', data);
          this.props.forceNetworkStore.focusNode(data.name);
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
  render() {
    return (
      <div>
        <svg width={this.props.svgWidth} height={this.props.svgHeight} >
          <defs>
            <marker id="mainArrow"
              markerUnits="userSpaceOnUse"
              markerWidth="40"
              markerHeight="40"
              viewBox="0 0 12 12"
              refX="25"
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
