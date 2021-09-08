import React from "react"
import { Close } from "../icons/icons"
//Gatby Image
import { Image } from "../components/gatsby-images/image"
import { Link } from "gatsby"

//data
import data from "../data/products.json"

function Menu() {
  return (
    <div className="products">
      <div className="menu-title">Products</div>
      <div className="close">
        <Close />
      </div>
      <div className="menu">
        <div className="container">
          <div className="menu-inner">
            <ul>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
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
    <li>
      <Link to={`/product/${id}`}>
        <div className="wrapper">
          <div className={`line left flex-${leftLineFlex}`}>
            {/* <div className="mask"></div> */}
          </div>
          <div className="title">
            <h2>
              <div className="text">{title}</div>
            </h2>
          </div>
          <div className="thumbnail" style={{ left: thumbnailPosition }}>
            <Image src={src} />
          </div>
          <div className="floating-image">
            <Image src={src} />
          </div>
          <div className={`line right flex-${rightLineFlex}`}>
            {/* <div className="mask right"></div> */}
          </div>
        </div>
      </Link>
    </li>
  )
}

export default Menu
