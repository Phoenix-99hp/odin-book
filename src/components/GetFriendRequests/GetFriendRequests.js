import React, { useEffect, useState } from "react"
import { getUser } from "../../services/auth"
import styles from "./GetFriendRequests.module.css"
import { navigate } from "gatsby"

const GetFriendRequests = () => {
  const [frs, setFrs] = useState(null)
  const currentUser = getUser()

  const acceptFr = e => {
    e.preventDefault()
    const requestToAccept = {
      request: e.target.parentElement.previousElementSibling.textContent,
    }
    fetch(
      `http://localhost:3001/api/friend-request/${currentUser._id}/accept`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestToAccept),
      }
    )
      .then(res => {
        return res.json()
      })
      .then(response => {
        if (response) {
          console.log(response)
          window.location.reload()
          // setFrs(response);
        } else {
          console.log("no response")
          navigate("/error")
        }
      })
      .catch(error => {
        console.log("catch", error)
        navigate("/error")
      })
  }

  const declineFr = e => {
    e.preventDefault()
    const requestToDecline = {
      request: e.target.parentElement.previousElementSibling.textContent,
    }
    fetch(
      `http://localhost:3001/api/friend-request/${currentUser._id}/decline`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestToDecline),
      }
    )
      .then(res => {
        return res.json()
      })
      .then(response => {
        if (response) {
          console.log(response)
          window.location.reload()
        } else {
          console.log("no response")
          navigate("/error")
        }
      })
      .catch(error => {
        console.log("catch", error)
        navigate("/error")
      })
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/friend-request/${currentUser._id}`, {
      method: "GET",
      mode: "cors",
    })
      .then(res => {
        return res.json()
      })
      .then(response => {
        if (response) {
          console.log(response)
          setFrs(response)
        } else {
          console.log("no response")
          navigate("/error")
        }
      })
      .catch(error => {
        console.log("catch", error)
        navigate("/error")
      })
  }, [])

  return frs
    ? frs.map((fr, index) => (
        <div className={styles.fr} key={index}>
          <span>{fr.username}</span>
          <div className={styles.btnContainer}>
            <button
              id={styles.acceptBtn}
              className={styles.btn}
              onClick={e => acceptFr(e)}
            >
              Accept
            </button>
            <button
              id={styles.declineBtn}
              className={styles.btn}
              onClick={e => declineFr(e)}
            >
              Decline
            </button>
          </div>
        </div>
      ))
    : null
}

export default GetFriendRequests
