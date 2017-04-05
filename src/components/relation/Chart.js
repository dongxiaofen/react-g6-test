import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import d3 from 'd3';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import bling1 from '../../../static/images/network/1.gif';
import bling2 from '../../../static/images/network/2.gif';
import bling3 from '../../../static/images/network/3.gif';
import bling4 from '../../../static/images/network/4.gif';
import bling5 from '../../../static/images/network/5.gif';
import bling6 from '../../../static/images/network/6.gif';
import bling7 from '../../../static/images/network/7.gif';
import bling8 from '../../../static/images/network/8.gif';
import bling9 from '../../../static/images/network/9.gif';
import bling10 from '../../../static/images/network/10.gif';
import styles from './chart.less';
let force;
let nodesData;
let edgesData;
let svgEdges;
let svgNodes;
let svgTexts;
let isDragging = false;
let zoom;
let nodeAdded = false;
let saveNodeXY = false;
@inject('relationStore')
@observer
export default class Chart extends Component {
  static propTypes = {
    relationStore: PropTypes.object,
  };
  componentDidMount() {
    const {currentNetwork} = this.props.relationStore.relationData;
    // 统计各层的节点数
    const layerCount = {};
    currentNetwork.nodes.map((node) => {
      if (layerCount[node.layer] === undefined) {
        layerCount[node.layer] = 1;
      } else {
        layerCount[node.layer]++;
      }
    });
    // 计算半径长度
    const radiusArr = [];
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
    console.log('radiusArr', radiusArr, layerCount);
    // 存储同心圆各节点坐标
    let nodeXY = {};
    zoom = d3.behavior.zoom();
    zoom.scaleExtent([0.1, 2.5]); // 缩放区间
    // zoom.scaleExtent([1, 1]); // 缩放区间,禁用鼠标滚轮缩放
    const svgWidth = (Math.max(document.body.clientWidth, 1280) - 390) * 3 / 4;
    const centerNodeX = svgWidth / 2;
    const centerNodeY = 300;
    const svg = d3.select('#currentSvg')
      .attr('width', svgWidth)
      .attr('height', '600')
      .call(zoom.on('zoom', () => {
        if (d3.event.sourceEvent) {
          if (d3.event.sourceEvent.type === 'mousemove') {// 鼠标平移
            // svg.attr('transform', `translate(${d3.event.translate}) scale(${this.props.currentNetwork.get('zoomIndex')})`);
          } else {// 鼠标缩放
            // console.log(d3.event.translate, d3.event.scale);
            zoom.scale([d3.event.scale]);
            svg.attr('transform', `translate(${d3.event.translate}) scale(${d3.event.scale})`);
            // this.props.commonBoundAC.updateValue(['zoomIndex'], d3.event.scale, 'NETWORK_UPDATE_VALUE');
          }
        }
        // const svgDom = d3.select('#currentSvg g');
        // svgDom.attr('transform', `${svgDom.attr('transform')} translate(${d3.event.translate})`);
        // svg.attr('transform', 'translate(' + d3.event.translate + ')' + ' scale(' + d3.event.scale + ')');
        // console.log(d3.event.translate, d3.event.scale);
      }))
      // .call(d3.behavior.drag()
      //   .origin(()=>{
      //     return {
      //       x: svgWidth / 2,
      //       y: 300
      //     };
      //   })
      //   .on('dragstart', (data)=>{
      //     console.log('dragstart', data);
      //   })
      //   .on('drag', ()=>{
      //     console.log('drag', d3.event.sourceEvent);
      //     svg.attr('transform', `translate(${d3.event.sourceEvent.x - (svgWidth / 2)}, ${d3.event.sourceEvent.y - 300})`);
      //   })
      //   .on('dragend', (data)=>{
      //     console.log('dragend', data);
      //   }))
      .append('g');
    nodesData = currentNetwork.nodes;
    edgesData = this.linksToIndex(currentNetwork);
    // 初始化force
    force = d3.layout.force()
      .nodes(nodesData)
      .links(edgesData)
      .size([svgWidth, 600])     // 作用力的中心区域
      .linkDistance(150)   // 连线的长度
      .linkStrength(0.5)
      .charge([-2500])     // 负数为排斥 正数为吸引
      .friction(0.8)
      .alpha(0.01)
      .gravity(0.3)
      .start();

    // 拖拽事件
    force.drag()
      .on('dragstart', (data) => {
        nodesData[nodesData.findIndex((node) => node.index === data.index)].dragged = 1;
        d3.event.sourceEvent.stopPropagation();
        // if (this.props.currentNetwork.getIn(['nodeMenu', 'show'])) {
        //   this.props.networkBoundAC.toggleNodeMenu(data, false);
        // }
      })
      .on('drag', () => {
        isDragging = true;
      })
      .on('dragend', (data) => {
        // console.log('dragend');
        if (!isDragging) {
          edgesData.map((link) => {
            link.focus = 0;
          });
          // console.log('click', data.linkedNodes);
          if (data.category !== 0) {
            // 高亮选中节点相关的边
            edgesData.map((link) => {
              if (link.target.name === data.name || link.source.name === data.name) {
                link.focus = 1;
              }
            });
            this.reDraw();
          }
        }
        // nodesData[nodesData.findIndex((node) => node.index === data.index)].dragged = 0;
        data.fixed = true;
        isDragging = false;
      });
    // 如果节点数超过50, 初始化只展示第一层节点, 要放在force.start后
    nodesData.map((node) => {
      if (nodesData.length > 50) {
        node.show = node.firstLayer;
      } else {
        node.show = 1;
      }
    });
    this.updateLinksDisplay(nodesData, edgesData);
    // 添加连线
    svgEdges = svg.selectAll('line')
      .data(edgesData)
      .enter()
      .append('line')
      .attr('class', (data) => {
        if (data.show === 0) {
          return styles.hide;
        }
        return styles.links;
      })
      .attr('marker-end', (data) => {
        //  return 'url(#relativeArrow)';
        return data.target.cateType === 0 ? 'url(#mainArrow)' : 'url(#relativeArrow)';
      })
      .on('mouseover', () => {
        if (d3.select(d3.event.target).attr('class') !== styles.focusLink) {
          d3.select(d3.event.target).attr('class', styles.hoverLink);
        }
      })
      .on('mouseout', () => {
        if (d3.select(d3.event.target).attr('class') !== styles.focusLink) {
          d3.select(d3.event.target).attr('class', styles.links);
        }
      });
    // 添加节点
    svgNodes = svg.selectAll('circle')
      .data(nodesData)
      .enter()
      .append('circle')
      .attr('r', (data) => {
        return data.cateType === 0 ? 30 : 12;
      })
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
      .call(force.drag);
    // 添加描述节点的文字
    svgTexts = svg.selectAll('text')
      .data(nodesData)
      .enter()
      .append('text')
      .attr('class', (data) => {
        if (data.show === 0) {
          return styles.hide;
        }
        return styles.text;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', (data) => {
        return data.cateType === 0 ? 45 : 25;
      })
      .text((data) => {         // 返回节点的名字
        return data.name;
      })
      .call(force.drag);
    force.on('tick', () => {
      if (!saveNodeXY) { // 只跑一次,然后存到nodeXY
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
      } else if (nodeAdded) { // 用户添加新节点
        console.log('添加节点后', nodesData);
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
      svgNodes
        .attr('cx', (data) => {
          if (data.layer !== -1) {
            return data.x;
          }
        })
        .attr('cy', (data) => {
          if (data.layer !== -1) {
            return data.y;
          }
        });
      svgEdges
        .attr('x1', (data) => {
          if (data.source.layer !== -1) {
            return data.source.x;
          }
        })
        .attr('y1', (data) => {
          if (data.source.layer !== -1) {
            return data.source.y;
          }
        })
        .attr('x2', (data) => {
          if (data.target.layer !== -1) {
            return data.target.x;
          }
        })
        .attr('y2', (data) => {
          if (data.target.layer !== -1) {
            return data.target.y;
          }
        });
      // .attr('marker-end', (data)=>{
      //   return data.target.name === '杭州誉存科技有限公司' ? 'url(#mainArrow)' : 'url(#relativeArrow)';
      // });
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
    });
  }
  // 获取最小半径公式
  getRadius = (nodeCount, nodeRadius = 25) => {
    return nodeRadius / Math.sin(Math.PI / nodeCount);
  }
  linksToIndex = (network) => {
    return network.links.map((link) => {
      const sourceIndex = network.nodes.findIndex((node) => node.name === link.source);
      const targetIndex = network.nodes.findIndex((node) => node.name === link.target);
      return { source: sourceIndex, target: targetIndex, linkData: link };
    });
  }
  // 重绘网络图
  reDraw = () => {
    const checkedArr = [];
    // 连线
    svgEdges = svgEdges.data(force.links());
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
    svgNodes = svgNodes.data(force.nodes());
    // update
    svgNodes.attr('r', (data) => {
      let res;
      if (data.search === 1) {
        res = 20;
      } else {
        res = data.cateType === 0 ? 30 : 12;
      }
      return res;
    })
      .attr('class', (data) => {
        let res;
        if (data.show === 0) {
          res = styles.hide;
        } else if (data.search === 1) {
          res = '';
        } else if (data.cateType === 0) {
          res = styles.mainCompany;
        } else if (data.blackList && data.category !== 7) {
          res = styles.blackListNodes;
        } else if (data.status === 0) {
          res = styles.cancelNodes;
        } else if (data.focus === 1) {
          res = styles.focusNode;
        } else {
          res = styles[`category${this.isNodeShow(checkedArr, data.cateList)}`];
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
        return data.search === 1 ? res : '';
      })
      .call(force.drag);
    // enter
    svgNodes.enter().append('circle')
      .attr('r', 12)
      .attr('class', (data) => {
        let res;
        if (data.blackList && data.category !== 7) {
          res = styles.blackListNodes;
        } else if (data.status === 0) {
          res = styles.cancelNodes;
        } else {
          res = styles[`category${this.isNodeShow(checkedArr, data.cateList)}`];
        }
        return res;
      })
      .call(force.drag);
    // exit
    svgNodes.exit().remove();

    // 文字描述
    svgTexts = svgTexts.data(force.nodes());
    // update
    svgTexts.attr('class', (data) => {
      return data.show === 0 ? styles.hide : styles.text;
    });
    // enter
    svgTexts.enter().append('text')
      .attr('class', styles.text)
      .attr('text-anchor', 'middle')
      .attr('dy', 25)
      .text((data) => {         // 返回节点的名字
        return data.name;
      })
      .call(force.drag);
    // exit
    svgTexts.exit().remove();
    force.start();
  }
  // 根据node的显示状态更新link的显示状态
  updateLinksDisplay = (nodes, links) => {
    links.map((link) => {
      if (nodes[nodes.findIndex((item) => item.name === link.source.name)].show > 0 && nodes[nodes.findIndex((item) => item.name === link.target.name)].show > 0) {
        link.show = 1;
      } else {
        link.show = 0;
      }
    });
  }
  render() {
    const {relationData} = this.props.relationStore;
    console.log('relationData', relationData);
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <svg id="currentSvg">
              <defs>
                <marker id="mainArrow"
                  markerUnits="userSpaceOnUse"
                  markerWidth="10"
                  markerHeight="10"
                  viewBox="0 0 12 12"
                  refX="50"
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
          </Col>
        </Row>
      </div>
    );
  }
}

