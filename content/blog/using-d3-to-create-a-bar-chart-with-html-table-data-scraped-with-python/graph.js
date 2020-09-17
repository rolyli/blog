import React from "react"
import * as d3 from "d3"
import data from './data'

class Graph extends React.Component {
  componentDidMount() {
    data.splice(25)

    const svg = d3.select('#fig1')
    const margins = {top: 50, right: 0, bottom: 120, left: 70}

    const width = 768
    const height = 700

    svg.attr('viewBox', `0 0 ${width} ${height}`)

    svg.append("text")
      .attr("x", ((width + margins.left) / 2))             
      .attr("y", 100)
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .text("Top 25 Most Played MMOs in 2020");

    const yScale = d3.scaleLinear()
      .range([height - margins.bottom, margins.top])
      .domain([0, 1500000]);

    const xScale = d3.scaleBand()
      .range([margins.left, width - margins.right])
      .domain(data.map((d) => d[0]))

    svg.append('g')
      .attr('transform', `translate(${margins.left}, 0)`)
      .call(d3.axisLeft(yScale));

    svg.append('g')
      .attr('class', 'xaxis')
      .attr('transform', `translate(0, ${height - margins.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr("transform", "translate(-10,0) rotate(-45)")
      .style("text-anchor", "end");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 )
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px") 
      .text("Total player count");      
      

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('height', (s) => height - margins.bottom - yScale(s[1]))
      .attr('width', xScale.bandwidth() - 5)
      .attr('x', (s) => xScale(s[0]) + 5)
      .attr('y', (s) => yScale(s[1]))
  }

  render() {
    return (
      <svg id="fig1" />
      )
  }
}

export default Graph