import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Login from "../sections/Login"

const IndexPage = () => (
  <Layout>
    <SEO title={"Sign In"} />
    <Login />
  </Layout>
)

export default IndexPage
