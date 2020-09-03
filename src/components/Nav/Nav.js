import React, { useContext } from "react";
import { ProfileContext } from "../../contexts/GlobalContext";
import { navigate } from "gatsby";
import { getUser } from "../../services/auth";
import styles from "./Nav.module.css";

const Nav = () => {
	const { setProfile } = useContext(ProfileContext);
	const currentUser = getUser();

	const handleSetProfile = (username) => {
		fetch(`http://localhost:3001/api/profile/${username}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					setProfile(response);
				} else {
					navigate("/error");
				}
			})
			.catch((error) => {
				console.log("catch profile", error);
				navigate("/error");
			});
	};

	return (
		<nav id={styles.nav}>
			<button
				className={styles.navItem}
				onClick={() => {
					if (currentUser) {
						handleSetProfile(currentUser.username);
						navigate("/user");
					}
				}}
			>
				Your Profile
			</button>
			<button
				className={styles.navItem}
				onClick={() => {
					navigate("/dashboard");
				}}
			>
				Dashboard
			</button>
		</nav>
	);
};

export default Nav;
