import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import useMousePosition from "../hooks/useMousePosition"
import { motion } from "framer-motion"

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
  const [cursorHover, setCursorHover] = useState(false)
  const { x, y } = useMousePosition()

  //we are using x,y in layout js so that we don't have to define useMousePosition in every component

  return (
    <div className="app">
      <motion.div
        animate={{
          x: x - 16, //we need to subtract 16 b.c cursor width is 2rem i.e 32 px , so subtract from both x,y to get 16
          y: y - 16,
          scale: cursorHover ? 1.5 : 1,
          opacity: cursorHover ? 0.8 : 0, //this makes the cursor invisible unless we are hovering on specific elements
        }}
        transition={{
          ease: "linear",
          duration: 0.2,
        }}
        className="cursor"
      ></motion.div>
      <Header
        siteTitle={siteData.site.siteMetadata.title}
        setMenuState={setMenuState}
        menuState={menuState}
        setCursorHover={setCursorHover}
      />
      <Menu
        x={x}
        y={y}
        menuState={menuState}
        setMenuState={setMenuState}
        setCursorHover={setCursorHover}
      />
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
