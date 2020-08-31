import React, { useState } from "react"

export const ProfileContext = React.createContext()
export const PostContext = React.createContext()

const GlobalContext = ({ children }) => {
  const [profile, setProfile] = useState(null)
  const [postId, setPost] = useState([])

  return (
    <ProfileContext.Provider
      value={{ profile: profile, setProfile: newData => setProfile(newData) }}
    >
      <PostContext.Provider
        value={{ postId: postId, setPost: newPostId => setPost(newPostId) }}
      >
        {children}
      </PostContext.Provider>
    </ProfileContext.Provider>
  )
}

export default ({ element }) => <GlobalContext>{element}</GlobalContext>
