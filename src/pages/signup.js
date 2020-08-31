import React from "react"
import SignUpLayout from "../components/SignUpLayout"
import SignUp from "../sections/SignUp"
import SEO from "../components/SEO"

const SignUpPage = () => {
  return (
    <SignUpLayout>
      <SEO title="Sign Up" />
      <SignUp />
    </SignUpLayout>
  )
}

export default SignUpPage
