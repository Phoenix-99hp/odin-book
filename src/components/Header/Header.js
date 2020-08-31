import React from "react"
import styles from "./Header.module.css"
import Nav from "../Nav"

const Header = () => {
  return (
    <div id={styles.headerContainer}>
      <div id={styles.contentContainer}>
        <h1 id={styles.heading}>Odin-Book</h1>
        <p id={styles.subHeading}>
          An Odin Project project (based on Facebook)
        </p>
      </div>
      <Nav />
    </div>
  )
}

export default Header
