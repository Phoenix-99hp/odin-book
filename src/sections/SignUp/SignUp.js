import React, { useState, useEffect } from "react"
import { handleLogin } from "../../services/auth"
import { navigate } from "gatsby"
import styles from "./SignUp.module.css"
import Spinner from "../../components/Spinner"

const SignUp = () => {
  const [userLogin, setUserLogin] = useState({
    username: null,
    password: null,
    confirmPassword: null,
  })

  // const [spinner, setSpinner] = useState(true)

  // useEffect(() => {
  //     setTimeout(() => {
  //         setSpinner(false);
  //     }, 1000)
  // }, [])

  const onChange = e => {
    const userInfo = { ...userLogin }
    const targetName = e.target.name
    userInfo[targetName] = e.target.value
    setUserLogin(userInfo)
  }

  const validate = ({ username, password, confirmPassword }) => {
    if (!username || !password || password !== confirmPassword) {
      return false
    }
    return true
  }

  const signUpReq = e => {
    e.preventDefault()
    if (validate(userLogin)) {
      fetch("http://localhost:3001/api/signup", {
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
      console.log("not validated")
      navigate("/error")
    }
  }

  return (
    // spinner ?
    //     <Spinner />
    //     :
    <>
      <div id={styles.formContainer}>
        <form id={styles.loginForm}>
          <h3 id={styles.heading}>Sign Up</h3>
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
            <div className={styles.formGroup}>
              <label className={styles.loginLabel}>Confirm Password:</label>
              <input
                name="confirmPassword"
                onChange={onChange}
                type="password"
                className={styles.loginInput}
              />
            </div>
          </div>
          <button type="submit" id={styles.loginBtn} onClick={signUpReq}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  )
}

export default SignUp
