import React from "react"
import {Navbar, Nav} from "react-bootstrap"
import { css } from "@emotion/core"
import { useStaticQuery, graphql, Link } from "gatsby"

export default function BlogNavbar() {
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
        <Navbar 
        expand="md"
        className="p-0"
        css={css`
          .navbar-toggler{
            border-style: none;
          }

          .navbar-toggler:focus{
            outline-width: 0;
          }
        `}
        >
            <Navbar.Brand>
                <Link to={"/"}>{data.site.siteMetadata.title}</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ml-md-auto">
                    <Nav.Link>Twitter</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}