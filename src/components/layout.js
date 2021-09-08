import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import useMousePosition from "../hooks/useMousePosition"

//Components
import Header from "./header"
import Menu from "./menu"

//Styles
import "../styles/App.scss"

const Layout = ({ children }) => {
  const siteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [menuState, setMenuState] = useState(false)

  const { x, y } = useMousePosition()

  //we are using x,y in layout js so that we don't have to define useMousePosition in every component

  return (
    <div className="app">
      <Header
        siteTitle={siteData.site.siteMetadata.title}
        setMenuState={setMenuState}
        menuState={menuState}
      />
      <Menu x={x} y={y} menuState={menuState} setMenuState={setMenuState} />
      <div>
        <main>{children}</main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
