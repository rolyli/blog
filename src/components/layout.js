import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import "./layout.css"

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: 800px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
        <h1
          css={css`
            margin-bottom: ${rhythm(2)};
          `}
        >
        <Link to={`/`} style={{textDecoration: 'none'}}>
        {data.site.siteMetadata.title}
      </Link>
      </h1>

      <hr />
      {children}
    </div>
  )
}
