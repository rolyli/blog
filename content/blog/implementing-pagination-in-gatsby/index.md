---
title: Implementing pagination in Gatsby
date: 2020-08-21T00:36:31.898Z
---
I wanted to implement pagination for my blog, but I didn't want to use an out of the box plugin from Gatsby. So I coded in my own pagination. As Gatsby uses React under the hood, it is robust and fun to implement features.

Before implementing the buttons for pagination, the pages must be created. Gatsby allows you to implement it's API for handling data within the GraphQL data layer. In order to create the pages, I implemented the `createPages` method in `./gatsby-node.js`.  

I used `Math.ceil` to find out how many pages we will need to generate, and then populated those pages using `actions.createPage`. The pages that get created use the `blog-list.js` template for the layout. More importantly, the createPage method allows you to specify a `context` item, which gets passed to the pages as React props that are accessible as `props.pageContext`. I can pass in information about the current page number, total number of pages, etc, to implment the pagination buttons, and then use those values within `blog-list.js`. 

```javascript
// ./gatsby-node.js

const posts = data.allMdx.edges
const postsPerPage = 6
const numPages = Math.ceil(posts.length / postsPerPage)
Array.from({ length: numPages }).forEach((_, i) => {
  actions.createPage({
    path: i === 0 ? `/` : `/blog/${i + 1}`,
    component: path.resolve("./src/templates/blog-list.js"),
    context: {
      limit: postsPerPage,
      skip: i * postsPerPage,
      numPages,
      currentPage: i + 1,
    },
  })
})
```

I also deconstructed the pageContext prop and then used the values to calculate the slug or URL of the next or previous page of blog post lists.  I will use those values so that I can navigate to those pages with a button.

```javascript
// src/templates/blog-list.js

export default function BlogList({data, pageContext}) {
  const posts = data.allMdx.edges
  const {currentPage, numPages} = pageContext
  const previousPageSlug = currentPage - 1 === 1? '/' : `/blog/${currentPage - 1}`
  const nextPageSlug = `/blog/` + ( currentPage + 1 )
```

For the actual buttons, I used a short circuit operator (&&) to hide the buttons if we've reached the beginning or the end. Short circuit operators return the second operand if the first operand is true.

```javascript
<p>
{(currentPage !== 1) && (<Link
    to={previousPageSlug}
    style={{marginRight: rhythm(0.25)}}
  >
    Newer
  </Link>
)}
Page: {currentPage} of {numPages}
{(currentPage !== numPages) && (
  <Link 
  to={nextPageSlug}
  style={{marginLeft: rhythm(0.25)}}
  >Older</Link>
)}
</p>
```