import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import StyledLink from "../components/styledLink"

export default function BlogList({data, pageContext}) {
  const posts = data.allMarkdownRemark.edges
  const {currentPage, numPages} = pageContext
  const nextPage = currentPage + 1
  return (
    <Layout>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <StyledLink to={node.fields.slug}>{title}</StyledLink>
          </div>
        )
      })}
      <hr css={css`
        margin-top: ${rhythm(1)}

      `}
      />


    </Layout>
  )
}


export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
