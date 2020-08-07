import React from "react"
import { graphql } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import BlogPostLayout from "../components/blog-post-layout"
import {Row, Col} from "react-bootstrap"

export default function BlogPostTemplate( {data, location} ) {
  const post = data.markdownRemark
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
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`
