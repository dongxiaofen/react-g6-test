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
let svgTexts;
let svgEdgepaths;
let svgEdgelabels;
let simulation;
let zoom;
let isDragging = false;


@inject('networkStore')
@observer
export default class ForceNetworkGraph extends Component {
  static propTypes = {
    networkStore: PropTypes.object,
    svgWidth: PropTypes.number,
    svgHeight: PropTypes.number
  };

  componentDidMount() {
    const graph = toJS(this.props.networkStore.currentNetwork);
    nodesData = graph.nodes;
    edgesData = graph.links;

    zoom = d3.zoom();
    const svg = d3.select('svg')
      .call(zoom.on('zoom', () => {
        // console.log(d3.event.transform);
        svg.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
      }))
      .append('g');
    const width = d3.select('svg').attr('width');
    const height = d3.select('svg').attr('height');

    simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((data) => { return data.name; }).distance(150))
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

    svgNodes = svg.append('g')
      .selectAll('circle')
      .data(nodesData)
      .enter().append('circle')
      .attr('r', 5)
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
        if (nodesData !== '') {
          const { focusNodeName } = this.props.networkStore;
          nodesData.map((node) => {
            node.isFocus = false;
          });
          if (focusNodeName === this.props.networkStore.mainCompanyName) {
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
  }
  ticked = () => {
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
        return (data.hide && styles.hide) || (data.isFocus && ' ') || (data.category === 0 && styles.mainCompany) || (data.blackList && data.category !== 7 && styles.blackListNodes) || (data.status === 0 && styles.cancelNodes) || styles[`category${svgTools.getNodeColor(this.props.networkStore.typeList.checkedArr, data.cateList)}`];
      })
      .attr('fill', (data) => {
        return (!data.isFocus && ' ') || (data.blackList && data.category !== 7 && 'url(#bling9)') || (data.status === 0 && 'url(#bling10)') || `url(#bling${data.category})`;
      });

    svgTexts
      .attr('x', (data) => {
        return data.x;
      })
      .attr('y', (data) => {
        return data.y;
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
        return (data.hide && styles.hide) || (data.isFocus && styles.show) || styles.hide;
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
      console.log(data, '单击');
      this.props.networkStore.focusNode(data.name);
    } else {
      // console.log(data, '拖拽结束');
    }
    isDragging = false;
    // data.fx = null;
    // data.fy = null;
  }

  render() {
    return (
      <div>
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
