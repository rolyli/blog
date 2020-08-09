import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { rhythm, scale } from "../utils/typography"
import BlogPostLayout from "../components/blog-post-layout"
import {Row, Col} from "react-bootstrap"


export default function BlogPostTemplate( {data, location} ) {
  const post = data.mdx
  return (
    <BlogPostLayout>
      <Row>
        <Col md={{offset: 1}}>
        <h2
          style={{
            ...scale(1.15),
            marginTop: rhythm(2),
            marginBottom: rhythm(2)
        }}>
          {post.frontmatter.title}
          <br/>
          <small
            style={{
              ...scale(0.10),
          }}>
            {post.frontmatter.date}
          </small>
      </h2>
        </Col>
      </Row>
      <MDXRenderer>{post.body}</MDXRenderer>
    </BlogPostLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`
