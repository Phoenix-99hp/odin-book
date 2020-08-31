import React, { useState, useEffect } from "react"
import styles from "./FriendRequests.module.css"
import { navigate } from "gatsby"

const FriendRequests = ({ requests, setRequests }) => {
  console.log(requests)

  return requests[0] ? (
    <div id={styles.frContainer}>
      <div id={styles.frNumber}>{requests.length}</div>
      <button id={styles.viewFrs} onClick={() => navigate("/frView")}>
        Friend Requests
      </button>
    </div>
  ) : null
}

export default FriendRequests
