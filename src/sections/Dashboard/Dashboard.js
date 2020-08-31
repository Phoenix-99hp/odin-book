import React, { useState, useEffect } from "react"
import styles from "./Dashboard.module.css"
// import SpinnerSmall from "../../components/SpinnerSmall"
import { navigate } from "gatsby"
import { getUser, logout } from "../../services/auth"
import FriendRequests from "../../components/FriendRequests"
import DisplayPosts from "../../components/DisplayPosts"
import ActionBar from "../../components/ActionBar"

const Dashboard = () => {
  return (
    <div id={styles.dashboardContainer}>
      <ActionBar />
      <DisplayPosts />
    </div>
  )
}

export default Dashboard
