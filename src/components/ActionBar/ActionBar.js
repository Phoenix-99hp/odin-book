import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import FriendRequests from "../FriendRequests";
import { getUser, logout } from "../../services/auth";
import styles from "./ActionBar.module.css";

const ActionBar = () => {
	const [friendReqs, setFriendReqs] = useState([]);
	const currentUser = getUser();

	useEffect(() => {
		fetch(`http://localhost:3001/api/friend-request/${currentUser._id}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					if (response[0]) {
						console.log(response);
						setFriendReqs(response);
					}
				} else {
					console.log("no response");
					return;
					// navigate("/error")
				}
			})
			.catch((error) => {
				console.log("catch", error);
				navigate("/error");
			});
	}, []);

	return (
		<div id={styles.actionBarContainer}>
			<button
				id={styles.userListBtn}
				className={styles.btn}
				onClick={() => navigate("/userList")}
			>
				User List
			</button>
			<button
				id={styles.addFriendBtn}
				className={styles.btn}
				onClick={() => navigate("/frSend")}
			>
				Add Friends
			</button>
			<FriendRequests requests={friendReqs} setRequests={setFriendReqs} />
			<button className={styles.btn} onClick={() => navigate("/post")}>
				Write Post
			</button>
			<button
				id={styles.logoutBtn}
				className={styles.btn}
				onClick={() => logout()}
			>
				Logout
			</button>
		</div>
	);
};

export default ActionBar;
