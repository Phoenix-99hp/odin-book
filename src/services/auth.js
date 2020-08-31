import { navigate } from "gatsby"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () => {
  if (isBrowser() && window.sessionStorage.getItem("User")) {
    return JSON.parse(window.sessionStorage.getItem("User"))
  } else {
    return null
  }
}

const setUser = user =>
  isBrowser()
    ? window.sessionStorage.setItem("User", JSON.stringify(user))
    : null

export const handleLogin = user => {
  if (isBrowser()) {
    setUser(user)
    navigate("/dashboard")
  } else {
    return null
  }
}

export const isLoggedIn = () => {
  if (isBrowser() && getUser()) {
    return true
  } else {
    return null
  }
}

export const logout = () => {
  if (isBrowser()) {
    window.sessionStorage.clear()
    navigate("/")
  } else {
    return null
  }
}
