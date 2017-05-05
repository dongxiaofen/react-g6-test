import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import styles from './index.less';
import * as d3 from 'd3';
let nodesData;
let edgesData;
let svgEdges;
let svgNodes;
// let svgTexts;
let svgEdgepaths;
let svgEdgelabels;
let simulation;
let zoom;
let isDragging = false;


@inject('blackNetworkStore')
@observer
export default class ForceNetworkGraph extends Component {
  static propTypes = {
    blackNetworkStore: PropTypes.object,
    svgWidth: PropTypes.number,
    svgHeight: PropTypes.number
  };

  componentDidMount() {
    console.log(toJS(this.props.blackNetworkStore), 'componentDidMount');
    const graph = toJS(this.props.blackNetworkStore.blackNetwork);
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

    simulation
      .nodes(nodesData)
      .on('tick', this.ticked);

    simulation.force('link')
      .links(edgesData);

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
      .attr('r', 5)
      // .attr('fill', (data) => { return color(data.group); })
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
      .attr('dx', 8)
      .attr('dy', -2)
      .attr('class', (data) => {
        return data.index > 10 ? styles.show : styles.hide;
      })
      .attr('font-size', 10)
      .attr('fill', '#aaa')
      .attr('id', (data, idx) => { return 'edgelabel' + idx; });


    svgEdgelabels.append('textPath')
      .attr('xlink:href', (data, idx) => { return '#edgepath' + idx; })
      .style('pointer-events', 'none')
      .text(() => { return 'label11111111111111111111111111 '; });

    // svgNodes.append('title')
    //   .text((data) => { console.log(data); return data.name; });

    // svgTexts = svg.selectAll('text')
    //   .data(nodesData)
    //   .enter()
    //   .append('text')
    //   .attr('class', (data) => {
    //     if (data.show === 0) {
    //       return styles.hide;
    //     }
    //     return styles.text;
    //   })
    //   .attr('text-anchor', 'middle')
    //   .attr('dy', (data) => {
    //     console.log(data, data.x);
    //     return data.cateType === 0 ? 45 : 25;
    //   })
    //   .text((data) => {         // 返回节点的名字
    //     return data.name;
    //   })
    //   .call(d3.drag);
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

    svgEdgepaths.attr('d', (data) => {
      const path = 'M ' + data.source.x + ' ' + data.source.y + ' L ' + data.target.x + ' ' + data.target.y;
      // console.log(d)
      return path;
    });

    svgEdgelabels.attr('transform', () => {
      // if (data.target.x < data.source.x) {
      //   bbox = this.getBBox();
      //   rx = bbox.x + bbox.width / 2;
      //   ry = bbox.y + bbox.height / 2;
      //   return 'rotate(180 ' + rx + ' ' + ry + ')';
      // }
      return 'rotate(0)';
    });
    // svgTexts
    //   .attr('x', (data) => {
    //     if (data.layer !== -1) {
    //       return data.x;
    //     }
    //   })
    //   .attr('y', (data) => {
    //     if (data.layer !== -1) {
    //       return data.y;
    //     }
    //   });
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
        <svg width={this.props.svgWidth} height={this.props.svgHeight} ></svg>
      </div>
    );
  }
}
