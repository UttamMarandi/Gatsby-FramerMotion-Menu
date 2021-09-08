import { useState, useEffect } from "react"

export default function useMousePosition() {
  //this hook will return the positon of the cursor whenever the mouse is moved
  let [mousePosition, setMousePosition] = useState({ x: null, y: null })

  useEffect(() => {
    function handlePosition(e) {
      setMousePosition({ x: e.pageX, y: e.pageY })
      //   The pageX read-only property of the MouseEvent interface returns the X (horizontal) coordinate (in pixels) at which the mouse was clicked, relative to the left edge of the entire document.
    }
    window.addEventListener("mousemove", handlePosition)

    return () => {
      //cleanup function
      window.removeEventListener("mousemove", handlePosition)
    }
  }, []) //runs useEffect only once
  return mousePosition //returns position of mouse
}
