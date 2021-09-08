import React, { useState, useRef, useEffect } from "react"
import { Close } from "../icons/icons"
//Gatby Image
import { Image } from "../components/gatsby-images/image"
import { Link } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"

//data
import data from "../data/products.json"

//Transition
const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] }
//variants

const parent = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1, //animation will not start until 1s has passed after we open the menu
    },
  },
}

const titleSlideUp = {
  initial: {
    y: 200,
  },
  animate: {
    y: 0,
  },
}
const maskAnimation = {
  // we are not actually animating the line but the mask that covers it, in that way initila and final has opposite effect sort of revealing effect
  initial: { width: "100%" },
  animate: { width: 0 },
}

function Menu({ menuState, setMenuState, x, y, setCursorHover }) {
  return (
    <>
      {/* AnimatePrsence allows to use exit animation when the path changes */}
      <AnimatePresence>
        {menuState && (
          <>
            <motion.div
              // making menu animation smmoth
              //our bar panel takes 2s to animate , so we want a delay of 1,to our exit so that animation of menu has already started when we see the menu
              initial={{ visibility: "hidden" }}
              animate={{ visibility: "visible", transition: { delay: 1 } }}
              exit={{ visibility: "hidden", transition: { delay: 1 } }}
              className="products"
            >
              <div className="menu-title">Products</div>
              <div
                onClick={() => setMenuState(false)}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                className="close"
              >
                <Close />
              </div>
              <div className="menu">
                <div className="container">
                  <div className="menu-inner">
                    <motion.ul
                      variants={parent}
                      initial="initial"
                      animate="animate"
                    >
                      {data.map(
                        (
                          {
                            title,
                            id,
                            leftLineFlex,
                            rightLineFlex,
                            thumbnailPosition,
                            offset,
                            src,
                          },
                          index
                        ) => (
                          <List
                            key={index}
                            title={title}
                            id={id}
                            leftLineFlex={leftLineFlex}
                            rightLineFlex={rightLineFlex}
                            thumbnailPosition={thumbnailPosition}
                            offset={offset}
                            src={src}
                            x={x} //this value do not come from destructuring List
                            y={y}
                            setCursorHover={setCursorHover}
                          />
                        )
                      )}
                    </motion.ul>
                  </div>
                </div>
              </div>
            </motion.div>
            <Panels />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const List = ({
  title,
  id,
  leftLineFlex,
  rightLineFlex,
  thumbnailPosition,
  offset,
  src,
  x,
  y,
  setCursorHover,
}) => {
  const list = useRef(null)
  const [hoverState, setHoverState] = useState(false)
  const [listPostion, setListPosition] = useState({
    top: 0,
    left: 0,
  })
  useEffect(() => {
    setListPosition({
      top: list.current.getBoundingClientRect().top,
      left: list.current.getBoundingClientRect().left,
    })
  }, [hoverState])

  return (
    <motion.li ref={list}>
      <Link to={`/product/${id}`}>
        <div className="wrapper">
          <div className={`line left flex-${leftLineFlex}`}>
            <motion.div
              variants={maskAnimation}
              transition={{ ...transition, duration: 1 }}
              // spread operator takes all the props and allow us to modify or add props to it
              className="mask"
            ></motion.div>
          </div>
          <motion.div
            className="title"
            onHoverStart={() => setHoverState(true)}
            onHoverEnd={() => setHoverState(false)}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            <h2>
              <motion.div
                variants={titleSlideUp}
                transition={transition}
                // for gsap we have Power, which  predefines the animation style , but in framer motion we could define custom transition
              >
                {title}
              </motion.div>
            </h2>
          </motion.div>
          <div className="thumbnail" style={{ left: thumbnailPosition }}>
            <Image src={src} />
            <motion.div
              variants={maskAnimation}
              transition={{ ...transition, duration: 1 }}
              className="mask"
            ></motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: hoverState ? 1 : 0,
              x: x - listPostion.top + offset,
              y: y - listPostion.left,
            }}
            transition={{
              ease: "linear",
            }}
            className="floating-image"
          >
            <Image src={src} />
          </motion.div>
          <div className={`line right flex-${rightLineFlex}`}>
            <motion.div
              variants={maskAnimation}
              transition={{ ...transition, duration: 1 }}
              className="mask right"
            ></motion.div>
          </div>
        </div>
      </Link>
    </motion.li>
  )
}

const Panels = () => {
  const [panelComplete, setPanelComplete] = useState(false)
  return (
    <>
      <motion.div
        // change backgroundColor based on panelComplete
        style={{ backgroundColor: panelComplete ? "#e7e7de" : "#e7dee7" }}
        initial={{ height: 0 }}
        animate={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        exit={{ height: [0, window.innerHeight, 0], top: [null, 0, 0] }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        // this is where all craziness happens
        //initally height is set to 0
        //now we want to animate the height. Instead of giving specific value we pass an array , which represnt that height will take keyframes
        //first height will be 0 , at middle time span height will be innerHeight and then height will again be 0. so by now animation will start from top , cover the entire div and then close at top
        //what we want is the div to close at bottom, so we define a bottom property which will also take keyframes. for first frame height is null , then for next two frames height is 0. this make sure while animation is closing , it closes at bottom
        //times is like timestamp , where 0 is intial timestamp then goes to 0.5 where height will set to window.innerHeight i.e 100vh, and than to 1,where it closes
        className="left-panel-background"
      ></motion.div>
      <motion.div
        style={{ backgroundColor: panelComplete ? "#e7e7de" : "#e7dee7" }}
        initial={{ height: 0 }}
        animate={{
          height: [0, window.innerHeight, 0],
          bottom: [0, 0, window.innerHeight],
        }}
        exit={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        className="right-panel-background"
        onAnimationComplete={() => {
          // if animation is completes toggle panelCompleted
          setPanelComplete(!panelComplete)
        }}
      ></motion.div>
      {/* <div className="right-panel-background"></div> */}
    </>
  )
}

export default Menu
