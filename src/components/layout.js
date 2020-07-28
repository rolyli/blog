import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import StyledLink from "../components/styledLink"

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
      <StyledLink to={`/`} style={{textDecoration: 'none'}}>
        <h1
          css={css`
            margin-bottom: ${rhythm(2)};
          `}
        >
          {data.site.siteMetadata.title}
        </h1>
      </StyledLink>
      <hr />
      {children}
    </div>
  )
}
