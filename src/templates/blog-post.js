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
        <Col>
        <div style={{
            marginBottom: rhythm(0.5)
        }}>
        <h2
          style={{
            ...scale(1.15),
            marginTop: rhythm(1),
            marginBottom: rhythm(1/10)
        }}>
          {post.frontmatter.title}
        </h2> 
      <small
            style={{

                ...scale(0.10),
          }}>
            {post.frontmatter.date}
          </small>
          </div>
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
