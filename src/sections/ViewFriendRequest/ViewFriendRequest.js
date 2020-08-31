import React from "react"
import styles from "./ViewFriendRequest.module.css"
import GetFriendRequests from "../../components/GetFriendRequests"
import { navigate } from "gatsby"

const ViewFriendRequest = () => {
  return (
    <div id={styles.friendReqForm}>
      <button id={styles.closeModalBtn} onClick={() => navigate("/dashboard")}>
        x
      </button>
      <h3 id={styles.heading}>Friend Requests</h3>
      <GetFriendRequests />
    </div>
  )
}

export default ViewFriendRequest
