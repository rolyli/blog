import {Navbar, Nav} from "react-bootstrap"
import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, graphql, Link } from "gatsby"
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
        padding: ${rhythm(0.5)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <Navbar expand="md" className="p-0">
      
      <Navbar.Brand>
        <Link to={"/"}>{data.site.siteMetadata.title}</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-md-auto">
            <Nav.Link>Twitter</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr />
      {children}
    </div>
  )
}
