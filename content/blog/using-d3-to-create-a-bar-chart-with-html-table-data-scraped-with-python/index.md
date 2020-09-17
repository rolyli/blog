---
title: Embedding d3 bar chart within markdown... and Python webscraping!
date: 2020-08-22T10:43:40.414Z
---
Data visualizations are beautiful. Here is a reflection of my learning processes on creating a d3.js bar chart, and taking advantage of MDX for embedding the graph as React component.

## Final bar chart

import Graph from "./graph"

<Graph />

## The process

I decided to scrape a website that specializes in MMO game statistics (I've been meaning to get back into playing MMOs). The raw data looks like the following excerpt. It's a simple HTML table.

```html
<tr>
<td class="community-bell">
<span style="font-size: 2.6em; color: #f2a900">56</span>
</td>
<th scope="row" style="text-align: left">
<a href="/r/ultimaonline/">Ultima Online</a>
</th>
 <td>7,809</td>
<td>273,993</td>
<td>
<span style="font-size: 1.2em;" class="badge  badge-warning ">3</span>
</td>
</tr>
<tr>
<td class="community-bell">
<span style="font-size: 2.6em; color: #f2a900">57</span>
</td>
<th scope="row" style="text-align: left">
<a href="/r/bless/">Bless Online</a>
</th>
<td>9,427</td>
<td>496,157</td>
<td>
<span style="font-size: 1.2em;" class="badge  badge-warning ">2</span>
</td>
</tr>
```

The Python script I wrote below fetches the above html source and uses regex to extract the actual data. As `re.findall()` returns a dictionary of tuples in the case of grouped data, I used `json.dumps()` to transform them into a JSON dictionary which is ideal for d3. To easily craft the regex pattern, I used [regex 101](https://regex101.com/) which allows you to supply your pattern and data and give real time feedback on the matches. 

```python
import requests
import re
import json

url = 'https://mmo-population.com/top/2020'
response = requests.get(url)

pattern = "<tr>\n.*\n.*\n.*\n.*\n<a.*>(.*)<\/a>\n<\/th>\n<td>(.*)<\/td>\n<td>(.*)<\/td>"
result = re.findall(pattern, response.text)
```

The data that is returned looks good except for the numbers. They are no-go for d3 because they are in a string format, with commas within the values.
```
[
    [
        "World of Warcraft",
        "2,334,490",
        "81,911,913"
    ],
    [
        "Old School RuneScape",
        "1,949,236",
        "25,647,838"
    ],
    [
        "FINAL FANTASY XIV: A Realm Reborn",
        "1,640,620",
        "19,188,540"
    ],
    [
        "World of Warcraft Classic",
        "1,329,328",
        "23,321,538"
    ],
    ...
 ]
```

To convert the numbers to a proper format, I used a loop.
```python
mmo_list = []

for i in result:
    mmo_item = [i[0], i[1], i[2]]
    mmo_item[1] = int(mmo_item[1].replace(',', ''))
    mmo_item[2] = int(mmo_item[2].replace(',', ''))
    mmo_list.append(mmo_item)
```

The resulting JSON dictionary looks like the following excerpt. Perfect!
```
[
    [
        "World of Warcraft",
        2334490,
        81911913
    ],
    [
        "Old School RuneScape",
        1949236,
        25647838
    ],
    [
        "FINAL FANTASY XIV: A Realm Reborn",
        1640620,
        19188540
    ],
    [
        "World of Warcraft Classic",
        1329328,
        23321538
    ],
    ...
 ]
```

As the data was ready, it was time to create the React component for the bar chart. Since I am using MDX formats for my blog posts, it allows me to embed React components directly into the markdown like the following (due to my oversight, it was a pain to convert the website to use .md to .mdx for blog posts but it was worth the effort).

```js
import Graph from "./graph"

<Graph />
```

The graph itself is simple bar chart made using d3. Interestingly it resides within a React component so that I can embed it within my markdown blog post.

```
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
```