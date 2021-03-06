import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import {Col, Row} from "react-bootstrap"
import BlogNavbar from "./blog-navbar"
import "./layout.css"

export default function Layout({ children }) {
  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: 1100px;
        padding: ${rhythm(0.5)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <Row>
        <Col sm={{offset: 2}}>
          <BlogNavbar />
        </Col>
      </Row>
      <hr />
      {children}
    </div>
  )
}
