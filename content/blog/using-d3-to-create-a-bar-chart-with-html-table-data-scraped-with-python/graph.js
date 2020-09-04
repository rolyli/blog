import React from "react"
import * as d3 from "d3"
import data from './data'

class Graph extends React.Component {
  componentDidMount() {
    const svg = d3.select('#fig1')

    const margin = 100;
    const xMargin = 70;
    const width = 768
    const height = 700

    svg.attr('viewBox', `0 0 ${width} ${height}`)

    const yScale = d3.scaleLinear()
      .range([height - margin, margin])
      .domain([0, 1000]);

    const xScale = d3.scaleBand()
      .range([xMargin, width - margin])
      .domain(data.map((d) => d.name))

    svg.append('g')
      .attr('transform', `translate(${xMargin}, 0)`)
      .call(d3.axisLeft(yScale));

    svg.append('g')
      .attr('class', 'xaxis')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr("transform", "rotate(90) translate(15, -15)")
      .style("text-anchor", "start");

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (s) => yScale(s.total1))
      .attr('height', (s) => height - margin - yScale(s.total1))
      .attr('width', xScale.bandwidth() - 10)
      .transition()
      .attr('x', (s) => xScale(s.name) + 5)
      .attr('y', (s) => yScale(s.total1))
      .duration(1000)
      
    function start() {
      data.sort((a, b) => d3.descending(a.total2, b.total2))
      xScale.domain(data.map((d) => d.name))
  
      svg.select(".xaxis")
        .transition()
        .call(d3.axisBottom(xScale))
  
      svg.selectAll('rect')
        .data(data)
        .transition()
        .attr('x', (s) => xScale(s.name) + 5)
        .attr('y', (s) => yScale(s.total2))
        .attr('height', (s) => height - margin - yScale(s.total2))
        .duration(1000) 
    }

    d3.select('#fig1').on("click", () => start()) 
  }

  render() {
    return (
      <svg id="fig1" />
      )
  }
}

export default Graph