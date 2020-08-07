import React from "react"
import { rhythm } from "../utils/typography"
import {Col, Row} from "react-bootstrap"
import { css } from "@emotion/core"
import BlogNavbar from "./blog-navbar"
import "./layout.css"

export default function BlogPostLayout({ children }) {
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
        <Col>
          <BlogNavbar />
        </Col>
      </Row>
      {children}
    </div>
  )
}
