import React, { useEffect, useState, useContext } from "react";
import { getUser, setUser } from "../../services/auth";
import { navigate, Link } from "gatsby";
import styles from "./UserList.module.css";
import { ProfileContext } from "../../contexts/GlobalContext";

const UserList = () => {
	const currentUser = getUser();
	const [users, setUsers] = useState([]);
	const { setProfile } = useContext(ProfileContext);

	useEffect(() => {
		fetch(`http://localhost:3001/api/all-users/${currentUser._id}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					setUsers(response);
				} else {
					console.log("no response");
					// navigate("/error")
				}
			})
			.catch((error) => {
				console.log("catch", error);
				navigate("/error");
			});
	}, []);

	const acceptFr = (e) => {
		e.preventDefault();
		const requestToAccept = {
			request: users[e.target.parentElement.dataset.index].username,
		};
		fetch(
			`http://localhost:3001/api/friend-request/${currentUser._id}/accept`,
			{
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestToAccept),
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					setUser(response);
					window.location.reload();
				} else {
					console.log("no response");
					navigate("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				navigate("/error");
			});
	};

	const declineFr = (e) => {
		e.preventDefault();
		const requestToDecline = {
			request: users[e.target.parentElement.dataset.index].username,
		};
		fetch(
			`http://localhost:3001/api/friend-request/${currentUser._id}/decline`,
			{
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestToDecline),
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					setUser(response);
					window.location.reload();
				} else {
					console.log("no response");
					navigate("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				navigate("/error");
			});
	};

	const handleFriendReq = (e) => {
		e.preventDefault();
		const friendReqUsername =
			users[e.target.parentElement.dataset.index].username;
		const fr = {
			username: friendReqUsername,
			currentUser: currentUser._id,
		};
		fetch("http://localhost:3001/api/friend-request", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(fr),
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					//   navigate("/dashboard")
					window.location.reload();
				} else {
					console.log("no response");
					navigate("/error");
				}
			})
			.catch((error) => {
				console.log("catch", error);
				navigate("/error");
			});
	};

	const handleRemoveFriend = (e) => {
		e.preventDefault();
		const friendToRemove =
			e.target.parentElement.previousElementSibling.textContent;
		fetch(
			`http://localhost:3001/api/friends/${currentUser._id}/${friendToRemove}/`,
			{
				method: "PUT",
				mode: "cors",
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					setUser(response);
					window.location.reload();
					// setUsers(response);
				} else {
					console.log("no response");
					// navigate("/error")
				}
			})
			.catch((error) => {
				console.log("catch", error);
				navigate("/error");
			});
	};

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
		<div id={styles.userContainer}>
			<button id={styles.closeModalBtn} onClick={() => navigate("/dashboard")}>
				x
			</button>
			<h3 id={styles.heading}>Users List</h3>
			{users[0] ? (
				users.map((user, index) => (
					<div className={styles.fr} key={index}>
						<img
							className={styles.avatar}
							src={
								"data:image/jpeg;base64," +
								btoa(
									String.fromCharCode(...new Uint8Array(user.avatar.data.data))
								)
							}
						/>
						<button
							className={styles.username}
							onClick={(e) => {
								handleSetProfile(e.target.textContent);
								navigate("/user");
							}}
						>
							{user.username}
						</button>
						{user.friendRequests.includes(currentUser._id) ? (
							<div className={styles.btnContainer} data-index={index}>
								<span>Friend request pending...</span>
							</div>
						) : currentUser.friendRequests.includes(user._id) ? (
							<div className={styles.btnContainer} data-index={index}>
								<button
									id={styles.acceptBtn}
									className={styles.btn}
									onClick={(e) => acceptFr(e)}
								>
									Accept
								</button>
								<button
									id={styles.declineBtn}
									className={styles.btn}
									onClick={(e) => declineFr(e)}
								>
									Decline
								</button>
							</div>
						) : currentUser.friends.includes(user._id) ? (
							<div className={styles.btnContainer} data-index={index}>
								<button
									className={styles.btn}
									onClick={(e) => handleRemoveFriend(e)}
								>
									Remove Friend
								</button>
							</div>
						) : (
							<div className={styles.btnContainer} data-index={index}>
								<button
									className={styles.btn}
									onClick={(e) => handleFriendReq(e)}
								>
									Send Friend Request
								</button>
							</div>
						)}
					</div>
				))
			) : (
				<div id={styles.friendReqForm}>
					There are currently no other users registered.
				</div>
			)}
		</div>
	);
};

export default UserList;
