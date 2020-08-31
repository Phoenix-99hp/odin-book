import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Profile from "../sections/Profile";

const UserPage = () => {
	return (
		<Layout>
			<SEO title="Profile" />
			<Profile />
		</Layout>
	);
};

export default UserPage;
