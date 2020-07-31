import React from "react"
import { graphql, Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import Layout from "../components/layout"
import { node } from "prop-types"

export default function BlogPostTemplate( {data, location} ) {
  const post = data.markdownRemark
  return (
    <Layout>
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
      <p dangerouslySetInnerHTML={{__html: post.html}}></p>
    </Layout>
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
