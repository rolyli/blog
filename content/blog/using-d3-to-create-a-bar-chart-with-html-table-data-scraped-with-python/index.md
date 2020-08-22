---
title: Using d3 to create a bar chart with HTML table data scraped with Python
date: 2020-08-22T10:43:40.414Z
---
In my pursuit for depth in web development, I thought it would be nice to do a couple of data visualisation projects using d3.

For the data itself, I decided to scrape a website that specializes in visualizing MMO game statistics (I've been meaning to get back into playing MMOs). The raw data looks like the following excerpt. It's a simple HTML table.

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
print(json.dumps(result, indent=4))
```

The resulting JSON dictionary looks like the following excerpt. Perfect!

```
[
    [
        "World of Warcraft",
        "2,314,255",
        "81,201,937"
    ],
    [
        "Old School RuneScape",
        "1,941,056",
        "25,540,206"
    ],
    [
        "FINAL FANTASY XIV: A Realm Reborn",
        "1,629,947",
        "19,063,703"
    ],
    [
        "World of Warcraft Classic",
        "1,326,384",
        "23,269,898"
    ],
    ...
 ]
```