import React from "react"
import * as d3 from "d3"
import data from './data'

class Graph extends React.Component {
  componentDidMount() {
    d3.select(".testing")
      .append("p")
      .text(data)
  }

  render() {
    return (
      <div class="testing">hi</div>
      )
  }
}

export default Graph