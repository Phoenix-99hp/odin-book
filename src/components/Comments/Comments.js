import React, { useContext, useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import styles from "./Comments.module.css"
import moment from "moment"
import { ProfileContext, PostContext } from "../../contexts/GlobalContext"
import Spinner from "../Spinner"

const Comments = ({ post, showComments }) => {
  const [spinner, setSpinner] = useState(false)
  const { postId } = useContext(PostContext)
  const { setProfile } = useContext(ProfileContext)

  // useEffect(() => {
  //     setSpinner(true)
  //     setTimeout(() => {
  //         setSpinner(false)
  //     }, 1000)
  // }, [postId])

  // spinner && postId.includes(post._id) ? (
  //     <div id={styles.spinnerContainer}>
  //         <Spinner />
  //     </div>
  // ) :

  return (
    <div
      className={`${styles.hide} ${
        postId.includes(post._id) ? styles.show : null
      }`}
    >
      {post.comments[0] ? (
        post.comments.map((comment, index) => {
          return (
            <div className={styles.commentContainer} key={index}>
              <div className={`${styles.space} ${styles.text}`}>
                {comment.text}
              </div>
              <div className={styles.commentUser}>
                <span className={styles.dash}>- </span>
                <button
                  className={styles.username}
                  onClick={e => {
                    setProfile(e.target.textContent)
                    navigate("/user")
                  }}
                >
                  {comment.user.username}
                </button>
                <span className={styles.timeSpan}>
                  ({moment(comment.timestamp).format("L")})
                </span>
              </div>
            </div>
          )
        })
      ) : (
        <div className={styles.commentContainer}>
          This post has not received any comments.
        </div>
      )}
    </div>
  )
}

export default Comments
