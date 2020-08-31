import React, { useState } from "react"

export const CommentContext = React.createContext()

const CommentContextProvider = ({ children }) => {
    const [showComments, setPost] = useState([])

    return (
        <CommentContext.Provider
            value={{ postId: postId, setPost: newPostId => setPost(newPostId) }}
        >
            {children}
        </CommentContext.Provider>
    )
}

export default ({ element }) => (
    <CommentContextProvider>{element}</CommentContextProvider>
)
