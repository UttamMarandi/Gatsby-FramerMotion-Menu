import { Link } from "gatsby"
import React, { useEffect } from "react"
import { useLocation } from "@reach/router"

const Header = ({ setMenuState, menuState }) => {
  const location = useLocation() //gets the path for the page
  useEffect(() => {
    setMenuState(false) //whenever the path changes set the menuState to false
  }, [location])

  return (
    <header>
      <div className="container fluid">
        <div className="header-inner">
          <Link activeClassName="active" to="/">
            Pocket.
          </Link>
          <div onClick={() => setMenuState(true)} className="hamburger-menu">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
