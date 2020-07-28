import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default function BlogPostTemplate( {data} ) {
  const post = data.markdownRemark
  return (
    <Layout>

    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
