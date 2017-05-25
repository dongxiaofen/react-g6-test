import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS, reaction } from 'mobx';
import styles from './index.less';
import * as d3 from 'd3';
import * as svgTools from 'helpers/svgTools';
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
let svg;
let group;

@inject('blackNetworkStore')
@observer
export default class ForceNetworkGraph extends Component {
  static propTypes = {
    blackNetworkStore: PropTypes.object,
    svgWidth: PropTypes.number,
    svgHeight: PropTypes.number
  };

  componentDidMount() {
    // console.log(toJS(this.props.blackNetworkStore), 'componentDidMount');
    const mainCompanyName = this.props.blackNetworkStore.mainCompanyName;
    const graph = toJS(this.props.blackNetworkStore.blackNetwork);
    nodesData = graph.nodes;
    edgesData = graph.links;
    zoom = d3.zoom();
    svg = d3.select('svg')
      .call(zoom.on('zoom', () => {
        group.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
      }));
    group = svg.append('g').attr('id', 'whole');

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
    // 第一次以后从关联关系跳转过来时， 更新expandIdx
    const pathsArr = this.props.blackNetworkStore.blackNetwork.paths;
    const expandIdx = this.props.blackNetworkStore.expandIdx;
    svgTools.updateNodeByExpandIdx(pathsArr, expandIdx, nodesData);
    svgTools.updateLinksDisplay(nodesData, edgesData);

    svgEdges = group.append('g')
      .attr('id', 'lines')
      .selectAll('line')
      .data(edgesData)
      .enter().append('line')
      .attr('class', (data) => {
        return !data.source.hide && !data.target.hide ? styles.links : styles.hide;
      })
      .attr('marker-end', () => {
        return 'url(#relativeArrow)';
      });

    svgNodes = group.append('g')
      .attr('id', 'nodes')
      .selectAll('circle')
      .data(nodesData)
      .enter().append('circle')
      .attr('r', 12)
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.isBlack && styles.blackListNodes) || (data.name === mainCompanyName && styles.mainCompany) || (data.type === 'networkCompany' && styles.relativeCompany) || (data.type === 'networkPerson' && styles.relativePerson) || styles.otherNode;
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended));
    svgTexts = group.append('g')
      .attr('id', 'texts')
      .selectAll('text')
      .data(nodesData)
      .enter()
      .append('text')
      .attr('class', (data) => {
        return data.hide ? styles.hide : styles.text;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', () => {
        return 25;
      })
      .text((data) => {         // 返回节点的名字
        return data.name;
      })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended));
    svgEdgepaths = group.append('g')
      .attr('id', 'edgepath')
      .selectAll('.edgepath')
      .data(edgesData)
      .enter()
      .append('path')
      .attr('d', (data) => { return 'M ' + data.source.x + ' ' + data.source.y + ' L ' + data.target.x + ' ' + data.target.y; })
      .attr('class', 'edgepath')
      .attr('id', (data, idx) => { return 'edgepath' + idx; })
      .style('pointer-events', 'none');

    svgEdgelabels = group.append('g')
      .attr('id', 'edgelabel')
      .selectAll('.edgelabel')
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
      .text((data) => { return svgTools.getBlackLinkInfo(data); });

    // 监听点击节点事件
    reaction(
      () => this.props.blackNetworkStore.focusNodeName,
      () => {
        const { focusNodeName } = this.props.blackNetworkStore;
        nodesData.map((node) => {
          node.isFocus = false;
        });
        nodesData.map((node) => {
          if (focusNodeName !== '' && node.name.indexOf(focusNodeName) >= 0) {
            node.isFocus = true;
          }
        });
        svgTools.focusRelatedLinks(focusNodeName, edgesData);
        simulation.restart();
      }
    );
    // 监听expand事件
    reaction(
      () => this.props.blackNetworkStore.expandIdx,
      () => {
        const newExpandIdx = this.props.blackNetworkStore.expandIdx;
        svgTools.updateNodeByExpandIdx(pathsArr, newExpandIdx, nodesData);
        svgTools.updateLinksDisplay(nodesData, edgesData);
        simulation.restart();
      }
    );
  }
  componentWillUnmount() {
    if (simulation) {
      simulation.stop(); // 停止网络图计算
    }
    nodesData = '';
    edgesData = '';
    svgEdges = '';
    svgNodes = '';
    svgTexts = '';
    isDragging = false;
    zoom = '';
    group = '';
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
      .attr('class', (data) => {
        return (data.hide && styles.hide) || (data.isBlack && styles.blackListNodes) || (data.name === this.props.blackNetworkStore.mainCompanyName && styles.mainCompany) || (data.type === 'networkCompany' && styles.relativeCompany) || (data.type === 'networkPerson' && styles.relativePerson) || styles.otherNode;
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

    svgTexts
      .attr('x', (data) => {
        return data.x;
      })
      .attr('y', (data) => {
        return data.y;
      })
      .attr('class', (data) => {
        return data.hide ? styles.hide : styles.text;
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
      this.props.blackNetworkStore.focusNode(data.name);
      console.log(data, '单击');
    } else {
      // console.log(data, '拖拽结束');
    }
    isDragging = false;
    // data.fx = null;
    // data.fy = null;
  }

  render() {
    return (
      <div className={styles.svgBox}>
        <svg width={this.props.svgWidth} height={this.props.svgHeight} >
          <defs>
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
          </defs>
        </svg>
      </div>
    );
  }
}
