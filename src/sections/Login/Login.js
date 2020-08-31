import React, { useState, useEffect } from "react"
import styles from "./Login.module.css"
import { navigate, Link } from "gatsby"
import { handleLogin } from "../../services/auth"

const Login = () => {
  // const [spinner, setSpinner] = useState(true);

  // useEffect(() => {

  // }, [])

  const [userLogin, setUserLogin] = useState({
    username: null,
    password: null,
  })

  const onChange = e => {
    const userInfo = { ...userLogin }
    const targetName = e.target.name
    userInfo[targetName] = e.target.value
    setUserLogin(userInfo)
  }

  const validate = ({ username, password }) => {
    if (!username || !password) {
      return false
    }
    return true
  }

  const loginReq = e => {
    e.preventDefault()
    if (validate(userLogin)) {
      fetch("http://localhost:3001/api/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      })
        .then(res => {
          return res.json()
        })
        .then(response => {
          if (response) {
            handleLogin(response)
          } else {
            navigate("/error")
          }
        })
        .catch(error => {
          console.log(error)
          navigate("/error")
        })
    } else {
      navigate("/error")
    }
  }

  return (
    <>
      <div id={styles.formContainer}>
        <form id={styles.loginForm}>
          <h3 id={styles.heading}>Sign In</h3>
          <div id={styles.innerFormContainer}>
            <div className={styles.formGroup}>
              <label className={styles.loginLabel}>Username:</label>
              <input
                name="username"
                onChange={onChange}
                type="text"
                className={styles.loginInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.loginLabel}>Password:</label>
              <input
                name="password"
                onChange={onChange}
                type="password"
                className={styles.loginInput}
              />
            </div>
          </div>
          <button type="submit" id={styles.loginBtn} onClick={loginReq}>
            Log In
          </button>
        </form>
      </div>
      <span id={styles.orSpan}>OR</span>
      <button id={styles.facebookBtn}>Log In With Facebook</button>
      <span id={styles.noAccountSpan}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </span>
    </>
  )
}

export default Login
