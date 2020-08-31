import React from "react"
import styles from "./FriendRequestForm.module.css"
import { navigate } from "gatsby"
import { getUser } from "../../services/auth"

const FriendRequestForm = () => {
  const currentUser = getUser()

  const handleFriendReq = e => {
    e.preventDefault()
    const friendReqUsername = e.target.previousElementSibling.children[1].value
    const fr = {
      username: friendReqUsername,
      currentUser: currentUser._id,
    }
    fetch("http://localhost:3001/api/friend-request", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fr),
    })
      .then(res => {
        return res.json()
      })
      .then(response => {
        if (response) {
          console.log(response)
          navigate("/dashboard")
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

  return (
    <form id={styles.friendReqForm}>
      <button id={styles.closeModalBtn} onClick={() => navigate("/dashboard")}>
        x
      </button>
      <h3 id={styles.heading}>Friend Request</h3>
      <div className={styles.formGroup}>
        <label>Username:</label>
        <input id={styles.friendReqInput} type="text" />
      </div>
      <button className={styles.btn} onClick={e => handleFriendReq(e)}>
        Send Request
      </button>
    </form>
  )
}

export default FriendRequestForm
