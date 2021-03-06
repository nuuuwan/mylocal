import {Component} from 'react';
import {getExtendedData} from 'core/DataTable.js';
import {getFieldNameColor} from 'core/Color.js';
import Table from './Table.js';

import './PieChart.css';

export default class PieChart extends Component {
  render() {
    const {dataMap, tableName, valueIsPercent} = this.props;
    const {extendedData, total} = getExtendedData(dataMap, valueIsPercent);
    const [width, height]= [120, 120];
    const [cx, cy] = [width / 2, height / 2];
    const r = Math.min(cx, cy);

    let runningTotal = 0;
    let tableInfos = [];
    const renderedArcs = extendedData.map(
      function([fieldName, value], iData) {
        const p1 = runningTotal / total;
        runningTotal += value;
        const p2 = runningTotal / total;

        const theta1 = p1 * 2 * Math.PI;
        const x1 = cx + r * Math.sin(theta1);
        const y1 = cy - r * Math.cos(theta1);

        const theta2 = p2 * 2 * Math.PI;
        const x2 = cx + r * Math.sin(theta2);
        const y2 = cy - r * Math.cos(theta2);

        const xAxisRot = 0
        const largeArcFlag = Math.abs(theta2 - theta1) > Math.PI ? 1 : 0;
        const sweepFlag = theta2 > 0 ? 1 : 0;

        const d = [
          `M${cx},${cy}`,
          `L${x1},${y1}`,
          `A${r},${r},${xAxisRot},${largeArcFlag},${sweepFlag},${x2},${y2}`,
          'Z',
        ].join(' ');

        const fill = getFieldNameColor(fieldName);
        tableInfos.push({
          key: fieldName,
          value: value,
          color: fill,
        })

        return (
          <path key={'pie-chart-' + iData} d={d} fill={fill}/>
        )
      }
    )

    return (
      <div key={'div-' + tableName} className="div-pie-chart-outer">
        <div className="div-table">
          {<Table
            tableInfos={tableInfos}
            total={total}
            valueIsPercent={valueIsPercent}
          />}
        </div>
        {valueIsPercent ? null : (
          <div className="div-pie-chart" >
            <svg className="svg-pie-chart" width={width} height={height}>
              {renderedArcs}
            </svg>
          </div>
        )}
      </div>
    )
  }
}
