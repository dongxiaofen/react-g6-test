import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import styles from './index.less';
import * as d3 from 'd3';
let nodesData;
let edgesData;
let svgEdges;
let svgNodes;
let simulation;
let zoom;
let isDragging = false;


@inject('networkStore')
@observer
export default class ForceNetworkGraph extends Component {
  static propTypes = {
    networkStore: PropTypes.object
  };

  componentDidMount() {
    console.log(toJS(this.props.networkStore), 'componentDidMount');
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

    // const color = d3.scaleOrdinal(d3.schemeCategory20);

    simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((data) => { return data.name; }))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));


    svgEdges = svg.append('g')
      .attr('class', styles.links)
      .selectAll('line')
      .data(edgesData)
      .enter().append('line');
    // .attr('stroke-width', (data) => { return Math.sqrt(data.value); });

    svgNodes = svg.append('g')
      .attr('class', styles.nodes)
      .selectAll('circle')
      .data(nodesData)
      .enter().append('circle')
      .attr('r', 10)
      // .attr('fill', (data) => { return color(data.group); })
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended));

    svgNodes.append('title')
      .text((data) => { return data.name; });

    simulation
      .nodes(nodesData)
      .on('tick', this.ticked);

    simulation.force('link')
      .links(edgesData);
  }
  ticked = () => {
    svgEdges
      .attr('x1', (data) => { return data.source.x; })
      .attr('y1', (data) => { return data.source.y; })
      .attr('x2', (data) => { return data.target.x; })
      .attr('y2', (data) => { return data.target.y; });

    svgNodes
      .attr('cx', (data) => { return data.x; })
      .attr('cy', (data) => { return data.y; });
  }
  dragstarted = (data) => {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    console.log(data, '开始拖拽');
    data.fx = data.x;
    data.fy = data.y;
  }

  dragged = (data) => {
    isDragging = true;
    console.log(data, '拖拽。。。');
    data.fx = d3.event.x;
    data.fy = d3.event.y;
  }

  dragended = (data) => {
    if (!d3.event.active) simulation.alphaTarget(0);
    if (!isDragging) {
      console.log(data, '单击');
    } else {
      console.log(data, '拖拽结束');
    }
    isDragging = false;
    // data.fx = null;
    // data.fy = null;
  }

  render() {
    return (
      <div>
        <svg width="960" height="600"></svg>
      </div>
    );
  }
}
