---
title: Using d3 to create a bar chart with HTML table data scraped with Python
date: 2020-08-22T10:43:40.414Z
---
For the pursuit of the full-stack, I thought it would be nice to do some data visualisation projects using d3. Besides, *data is beautiful*. 

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

import Graph from "./graph"

<Graph />