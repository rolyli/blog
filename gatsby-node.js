/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  data.allMarkdownRemark.edges.forEach(edge => {
    const slug = edge.node.fields.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/blog-post.js`),
      context: { slug: slug },
    })
  })
}

exports.onCreateNode = ( {node, getNode, actions} ) => {
  const { createNodeField } = actions
  if (node.internal.type == 'MarkdownRemark') {
    const slug = createFilePath( { node, getNode, basePath: 'pages'} )
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}
