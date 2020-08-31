import React, { useState } from "react"

export const ProfileContext = React.createContext()

const ProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null)

  return (
    <ProfileContext.Provider
      value={{
        userProfile: userProfile,
        setUserProfile: newUserProfile => setUserProfile(newUserProfile),
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export default ({ element }) => (
  <ProfileContextProvider>{element}</ProfileContextProvider>
)
