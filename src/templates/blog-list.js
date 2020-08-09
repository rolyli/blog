import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { rhythm, scale } from "../utils/typography"

import Layout from "../components/layout"
import {Col, Row} from "react-bootstrap"

export default function BlogList({data, pageContext}) {
  const posts = data.allMdx.edges
  const {currentPage, numPages} = pageContext
  const previousPageSlug = currentPage - 1 === 1? '/' : `/blog/${currentPage - 1}`
  const nextPageSlug = `/blog/` + ( currentPage + 1 )


  const PostHeader = styled.div`
    margin-bottom: ${rhythm(1)}
  `

  return (
    <Layout>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
            <div key={node.fields.slug}>
            <Row>
            <Col sm={2}>
            </Col>
            <Col sm={3}>
            <PostHeader>
              <h2 style={{
                    ...scale(),
                    marginBottom: 0,
              }}>
                <Link to={node.fields.slug}>{title}</Link>
              </h2>
              <small>{node.frontmatter.date}</small>
            </PostHeader>
            </Col>
            <Col sm={7}>
            <p dangerouslySetInnerHTML={{__html: node.excerpt}}/>
            <p>
              <Link to={node.fields.slug}>
                Read more →
              </Link>
            </p>
            </Col>
            </Row>
            <Row>
              <Col sm={{offset: 2}}>
              <hr css={css`
                margin-top: ${rhythm(2.5)}
              `} />
              </Col>
            </Row>
          </div>
        )
      })}
      <Row>
        <Col sm={{offset: 2}}>
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
        </Col>
      </Row>


    </Layout>
  )
}


export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: {order: DESC, fields: frontmatter___date}
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
            date(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  }
`
