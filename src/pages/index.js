import React from "react"
import { graphql, Link} from "gatsby"
import Layout from "../components/layout"

export default function IndexPage( {data} ) {
  return (
    <Layout>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={node.fields.slug}>
        <h3>{node.frontmatter.title}</h3>
        </Link>
      </div>
    ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
