import React, { useContext, useEffect, useState } from "react";
import { getUser } from "../../services/auth";
import { navigate } from "gatsby";
import { ProfileContext } from "../../contexts/GlobalContext";
import styles from "./Profile.module.css";
import Comments from "../../components/Comments";
import Like from "../../components/Like";
import moment from "moment";

const Profile = () => {
	const currentUser = getUser();
	const { profile, setProfile } = useContext(ProfileContext);
	const [alreadySentFr, setAlreadySentFr] = useState(null);
	const [postsToDisplay, setPostsToDisplay] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		fetch(
			`http://localhost:3001/api/friend-request/friends/${profile.username}`,
			{
				method: "GET",
				mode: "cors",
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					if (response.friends.includes(currentUser._id)) {
						setAlreadySentFr("friends");
					} else if (response.friendRequests.includes(currentUser._id)) {
						setAlreadySentFr("request");
					}
				}
			})
			.catch((error) => {
				console.log("catch", error);
				navigate("/error");
			});
	}, [profile]);

	useEffect(() => {
		fetch(`http://localhost:3001/api/posts/user/${profile.username}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					if (response[0]) {
						setPostsToDisplay(response);
					}
				}
			})
			.catch((error) => {
				console.log("catch", error);
				navigate("/error");
			});
	}, [profile]);

	const loadFunc = () => {
		if (postsToDisplay[0]) {
			fetch(
				`http://localhost:3001/api/posts/more/${profile.username}/${
					postsToDisplay[postsToDisplay.length - 1]._id
				}`,
				{
					method: "GET",
					mode: "cors",
				}
			)
				.then((res) => {
					return res.json();
				})
				.then((response) => {
					console.log("posts load func response", response);
					if (response) {
						if (response.hasMore >= 10) {
							setPostsToDisplay([
								...postsToDisplay,
								...response.additionalPosts,
							]);
						} else if (response.additionalPosts[0]) {
							setPostsToDisplay([
								...postsToDisplay,
								...response.additionalPosts,
							]);
							setHasMore(false);
						}
					} else {
						setHasMore(false);
						console.log("no response");
					}
				})
				.catch((error) => {
					console.log("catch load func", error);
					navigate("/error");
				});
		}
	};

	window.onscroll = () => {
		if (!hasMore) {
			window.removeEventListener("scroll", this);
		} else if (
			window.innerHeight + window.pageYOffset >=
				document.documentElement.scrollHeight &&
			hasMore
		) {
			loadFunc();
		}
	};

	return (
		<div id={styles.profileContainer}>
			<div id={styles.profileInfo}>
				<img
					id={styles.profileImg}
					src={
						"data:image/jpeg;base64," +
						btoa(
							String.fromCharCode(
								...new Uint8Array(profile.profilePicture.data.data)
							)
						)
					}
				/>
				<h1 id={styles.username}>{profile.username}</h1>
				{alreadySentFr === "friends" ? (
					<div id={styles.custom}>
						<span>You and this user are friends.</span>
					</div>
				) : alreadySentFr === "request" ? (
					<div id={styles.custom}>
						<span>You have already sent this user a friend request.</span>
					</div>
				) : currentUser.username !== profile.username ? (
					<div id={styles.custom}>
						<button className={styles.btn}>Send Friend Request</button>
					</div>
				) : null}
			</div>
			<div id={styles.postContainer}>
				<h1 id={styles.postsHeading}>{profile.username}'s posts:</h1>
				{postsToDisplay[0] ? (
					postsToDisplay.map((post, index) => {
						return (
							<>
								<div className={styles.pcContainer} key={index}>
									<div className={styles.postContainer}>
										<h1 className={`${styles.space} ${styles.postTitle}`}>
											{post.title}
										</h1>
										<div className={`${styles.pBody} ${styles.space}`}>
											{post.text}
										</div>
										<div className={`${styles.postUser} ${styles.space}`}>
											<img
												id={styles.avatar}
												src={
													"data:image/jpeg;base64," +
													btoa(
														String.fromCharCode(
															...new Uint8Array(profile.avatar.data.data)
														)
													)
												}
											/>
											<span className={styles.username}>
												{post.user.username}
											</span>
											<span className={styles.timeSpan}>
												({moment(post.timestamp).format("L")})
											</span>
										</div>
										<Like count={post.likes.length} post={post} />
									</div>
								</div>
								<Comments setProfile={setProfile} post={post} />
								{index === postsToDisplay.length - 1 && !hasMore ? (
									<div id={styles.seenAll}>You've seen them all!</div>
								) : null}
							</>
						);
					})
				) : (
					<span id={styles.noPosts}>There are no posts to display.</span>
				)}
			</div>
		</div>
	);
};

export default Profile;
