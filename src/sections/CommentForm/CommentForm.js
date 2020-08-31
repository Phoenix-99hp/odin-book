import React, { useContext } from "react"
import { getUser } from "../../services/auth"
import { navigate } from "gatsby"
import styles from "./CommentForm.module.css"
import { PostContext } from "../../contexts/GlobalContext"

const CommentForm = () => {
  const { postId } = useContext(PostContext)

  const handleCommentSubmit = e => {
    e.preventDefault()
    const commentData = {
      postId: postId,
      text: e.target.previousElementSibling.children[0].children[1].value,
      user: getUser()._id,
    }
    fetch("http://localhost:3001/api/new-comment", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
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
    <form id={styles.commentForm}>
      <button id={styles.closeModalBtn} onClick={() => navigate("/dashboard")}>
        x
      </button>
      <h3 id={styles.heading}>Write Comment</h3>
      <div id={styles.fieldContainer}>
        <div className={styles.formGroup}>
          <label id={styles.cBodyLabel}>Comment:</label>
          <textarea id={styles.postInput} type="text" />
        </div>
      </div>
      <button className={styles.btn} onClick={e => handleCommentSubmit(e)}>
        Create Comment
      </button>
    </form>
  )
}

export default CommentForm
