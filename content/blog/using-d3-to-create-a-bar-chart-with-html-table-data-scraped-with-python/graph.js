import React from "react"
import * as d3 from "d3"
import data from './data'

class Graph extends React.Component {
  componentDidMount() {
    data.splice(20)
    const svg = d3.select('#fig1')
    const margin = 100;
    const xMargin = 70;
    const width = svg.attr('width') 
    const height = svg.attr('height')

    const yScale = d3.scaleLinear()
      .range([height - margin, margin])
      .domain([0, 2500000]);

    const xScale = d3.scaleBand()
      .range([xMargin, width - margin])
      .domain(data.map((d) => d[0]))

    svg.append('g')
      .attr('transform', `translate(${xMargin}, 0)`)
      .call(d3.axisLeft(yScale));

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr("transform", "rotate(90) translate(15, -15)")
      .style("text-anchor", "start");

      svg.selectAll()
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (s) => xScale(s[0]) + 5)
      .attr('y', (s) => yScale(s[1]))
      .attr('height', (s) => height - margin - yScale(s[1]))
      .attr('width', xScale.bandwidth() - 10)
  }

  render() {
    return (
      <svg width='768' height='700' id="fig1"/>
      )
  }
}

export default Graph