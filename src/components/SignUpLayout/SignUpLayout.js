/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import Header from "../Header"
import styles from "./SignUpLayout.module.css"
import Spinner from "../Spinner"

const SignUpLayout = ({ children }) => {
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false)
    }, 1000)
  }, [])

  return (
    <div id={styles.pageContainer}>
      <Header />
      <main>{spinner ? <Spinner /> : children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}

export default SignUpLayout
