import React, { useContext, useEffect, useState } from "react"
import { getUser } from "../../services/auth"
import { navigate } from "gatsby"
import { ProfileContext } from "../../contexts/GlobalContext"
import styles from "./Profile.module.css"

const Profile = () => {
  const currentUser = getUser()
  const { profile, setProfile } = useContext(ProfileContext)
  const [alreadySentFr, setAlreadySentFr] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3001/api/friend-request/friends/${profile}`, {
      method: "GET",
      mode: "cors",
    })
      .then(res => {
        return res.json()
      })
      .then(response => {
        if (response) {
          if (response.friends.includes(currentUser._id)) {
            setAlreadySentFr("friends")
          } else if (response.friendRequests.includes(currentUser._id)) {
            setAlreadySentFr("request")
          }
        }
      })
      .catch(error => {
        console.log("catch", error)
        navigate("/error")
      })
  }, [])

  return (
    <div id={styles.profileContainer}>
      <h1>{profile}</h1>
      <img></img>
      {alreadySentFr === "friends" ? (
        <div id={styles.custom}>
          <span>You and this user are friends</span>
        </div>
      ) : alreadySentFr === "request" ? (
        <div id={styles.custom}>
          <span>You have already sent this user a friend request</span>
        </div>
      ) : currentUser.username !== profile ? (
        <div id={styles.custom}>
          <button>Send Friend Request</button>
        </div>
      ) : null}
    </div>
  )
}

export default Profile
