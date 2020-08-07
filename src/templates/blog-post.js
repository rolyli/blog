import React from "react"
import { graphql } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import BlogPostLayout from "../components/blog-post-layout"

export default function BlogPostTemplate( {data, location} ) {
  const post = data.markdownRemark
  return (
    <BlogPostLayout>
      <h2
        style={{
          ...scale(1.15),
          marginTop: rhythm(1.5),
          marginBottom: rhythm(1.5),
        }}
      >{post.frontmatter.title}
      <br/>
      <small
        style={{
          ...scale(0.25),
      }}>{post.frontmatter.date}</small>
      </h2>
      <div dangerouslySetInnerHTML={{__html: post.html}}></div>
    </BlogPostLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
