import React from "react"
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

function Menu({ menuState, setMenuState }) {
  return (
    <>
      {/* AnimatePrsence allows to use exit animation when the path changes */}
      <AnimatePresence>
        {menuState && (
          <motion.div exit={{ opacity: 0 }} className="products">
            <div className="menu-title">Products</div>
            <div onClick={() => setMenuState(false)} className="close">
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
                        />
                      )
                    )}
                  </motion.ul>
                </div>
              </div>
            </div>
          </motion.div>
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
}) => {
  return (
    <motion.li>
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
          <div className="title">
            <h2>
              <motion.div
                variants={titleSlideUp}
                transition={transition}
                // for gsap we have Power, which  predefines the animation style , but in framer motion we could define custom transition
              >
                {title}
              </motion.div>
            </h2>
          </div>
          <div className="thumbnail" style={{ left: thumbnailPosition }}>
            <Image src={src} />
            <motion.div
              variants={maskAnimation}
              transition={{ ...transition, duration: 1 }}
              className="mask"
            ></motion.div>
          </div>
          <div className="floating-image">
            <Image src={src} />
          </div>
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

export default Menu
