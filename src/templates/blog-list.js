import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { rhythm } from "../utils/typography"

import Layout from "../components/layout"

export default function BlogList({data, pageContext}) {
  const posts = data.allMarkdownRemark.edges
  const {currentPage, numPages} = pageContext
  const nextPage = currentPage + 1


  const PostHeader = styled.div`
    margin-bottom: ${rhythm(1)}
  `

  return (
    <Layout>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <PostHeader>
              <h3 style={{
                    marginBottom: rhythm(1 / 4),
              }}>
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </PostHeader>

            <p dangerouslySetInnerHTML={{__html: node.excerpt}}/>
            
            <Link to={node.fields.slug}>
              <u>Read more →</u>
            </Link>

            <hr css={css`
              margin-top: ${rhythm(2.5)}
            `} />
          </div>
        )
      })}
      <p>
        Page: {currentPage} of {numPages} {
           currentPage !== numPages? <Link to={`/blog/${nextPage}`}>Older</Link>: false}
      </p>
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
          excerpt(pruneLength: 600)
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
