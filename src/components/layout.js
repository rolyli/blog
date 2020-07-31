import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm, scale } from "../utils/typography"
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
        max-width: 600px;
        padding: ${rhythm(0.5)};
        padding-top: ${rhythm(1.5)};
      `}
    >
        <h1
          style={{
            ...scale(0.5),
            marginBottom: rhythm(2)
          }}
        >
        <Link
          style={{textDecoration: 'none'}}
          to={'/'}
        >
        {data.site.siteMetadata.title}
        </Link>
      </h1>

      <hr />
      {children}
    </div>
  )
}
