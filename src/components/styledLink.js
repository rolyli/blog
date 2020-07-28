import React from "react"
import styled from '@emotion/styled'
import { Link } from "gatsby"

const StyledLink = styled(props => <Link {...props} />)`
    color: black;
    text-decoration-color: rgba(0, 0, 0, 0.4)
  `;

export default StyledLink
