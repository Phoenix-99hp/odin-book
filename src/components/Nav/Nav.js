import React, { useContext } from "react"
import { ProfileContext } from "../../contexts/GlobalContext"
import { navigate } from "gatsby"
import { getUser } from "../../services/auth"
import styles from "./Nav.module.css"

const Nav = () => {
  const { setProfile } = useContext(ProfileContext)
  const currentUser = getUser()
  return (
    <nav id={styles.nav}>
      <button
        className={styles.navItem}
        onClick={() => {
          if (currentUser) {
            setProfile(currentUser.username)
            navigate("/user")
          }
        }}
      >
        Your Profile
      </button>
      <button
        className={styles.navItem}
        onClick={() => {
          navigate("/dashboard")
        }}
      >
        Dashboard
      </button>
    </nav>
  )
}

export default Nav
