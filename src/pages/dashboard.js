import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Dashboard from "../sections/Dashboard"
import Nav from "../components/Nav"

const DashboardPage = () => (
  <Layout>
    <SEO title="Dashboard" />
    <Dashboard />
  </Layout>
)

export default DashboardPage
