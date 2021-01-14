---
title: Add Locomotive Scroll to Gatsby
date: 2021-01-14T01:18:41.541Z
---
To embed LocomotiveScroll using Javascript, the official documentation instructs you to initialize a new LocomotiveScroll object.

```javascript
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});
```

However, as Gatsby uses React, the scroll object must be initialized after the main component is mounted. We would usually do this by initializing the scroll object within `componentDidMount` method, however such methods are not available for React functional components which integrates better with Gatsby (official documentation uses functional components as well). We can use React hooks (new addition to React 16.8) instead to essentially tell React to run any code after the component is mounted.
  
```
useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
    })
  });
```

Adding this to my Layout page looks like the following

```
import React, {useEffect} from "react"
import LocomotiveScroll from "locomotive-scroll"

const Layout = ({ children }) => {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
    })
  });

  return (
      <div data-scroll-container>
        {children}
      </div>
  )
}

export default Layout
```
