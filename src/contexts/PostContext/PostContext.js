import React, { useState } from "react"

export const PostContext = React.createContext()

const PostContextProvider = ({ children }) => {
  const [postId, setPost] = useState([])

  return (
    <PostContext.Provider
      value={{ postId: postId, setPost: newPostId => setPost(newPostId) }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default ({ element }) => (
  <PostContextProvider>{element}</PostContextProvider>
)
