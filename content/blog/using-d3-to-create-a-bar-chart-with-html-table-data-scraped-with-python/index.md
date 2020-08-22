---
title: Using d3 to create a bar chart with HTML table data scraped with Python
date: 2020-08-22T10:43:40.414Z
---
I'm constantly trying to broaden my depth and breath of web development, and thought it would be nice to do a couple of data visualisation projects using d3.

For the data, I decided to scrape it from a web site. To be honest, I've been meaning to get back into playing an MMO, and was wondering what the most popular ones are. I found a website with tabular data on population rankings and decided to scrape this.

I used Python to scrape the data using the default packages that come shipped with Python 3. The code I wrote below fetches the html source and uses regex to extract the actual data. As `re.findall()` returns a dictionary of tuples in the case of grouped data, I used `json.dumps()` to transform them into a JSON dictionary which is ideal for d3. To easily craft the regex pattern, I used [regex 101] (https://regex101.com/) which allows you to supply your pattern and data and give real time feedback on the matches.

```python
import requests
import re
import json

url = 'https://mmo-population.com/top/2020'
response = requests.get(url)

pattern = "<tr>\n.*\n.*\n.*\n.*\n<a.*>(.*)<\/a>\n<\/th>\n<td>(.*)<\/td>\n<td>(.*)<\/td>"
result = re.findall(pattern, response.text)
print(json.dumps(result))
```

The resulting JSON dictionary looks like the following excerpt.

`[["World of Warcraft", "2,314,255", "81,201,937"], ["Old School RuneScape", "1,941,056", "25,540,206"], ["FINAL FANTASY XIV: A Realm Reborn", "1,629,947", "19,063,703"], ["World of Warcraft Classic", "1,326,384", "23,269,898"], ["Destiny 2", "1,009,960", "26,577,899"], ["RuneScape", "675,752", "11,855,298"], ["The Elder Scrolls Online", "686,707", "14,456,988"] ... ]`