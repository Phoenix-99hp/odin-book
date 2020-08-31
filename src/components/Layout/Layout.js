/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import Header from "../Header"
import styles from "./Layout.module.css"
import { isLoggedIn } from "../../services/auth"
import Login from "../../sections/Login"
import SEO from "../SEO"
import Spinner from "../Spinner"

const Layout = ({ children }) => {
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false)
    }, 1000)
  }, [])

  return (
    <div id={styles.pageContainer}>
      <Header />
      <main>
        {spinner ? (
          <Spinner />
        ) : isLoggedIn() ? (
          children
        ) : (
          <>
            <SEO title={"Sign In"} />
            <Login />
          </>
        )}
      </main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout
