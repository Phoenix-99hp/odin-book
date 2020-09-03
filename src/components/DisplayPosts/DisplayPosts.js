import React, { useState, useEffect, useContext } from "react";
import { navigate, Link } from "gatsby";
import styles from "./DisplayPosts.module.css";
import moment from "moment";
import { getUser } from "../../services/auth";
// import Spinner from "../Spinner"
import Like from "../Like";
import Comments from "../Comments";
import { ProfileContext } from "../../contexts/GlobalContext";

const DisplayPosts = () => {
	const [postsToDisplay, setPostsToDisplay] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const { setProfile } = useContext(ProfileContext);
	const currentUser = getUser();
	// const [profile, setProfile] = useState(currentUser);

	useEffect(() => {
		fetch(`http://localhost:3001/api/posts/${currentUser._id}`, {
			method: "GET",
			mode: "cors",
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					setPostsToDisplay(response);
				} else {
					console.log("no posts to display");
				}
			})
			.catch((error) => {
				console.log("catch initial", error);
				navigate("/error");
			});
	}, []);

	const loadFunc = () => {
		if (postsToDisplay[0]) {
			fetch(
				`http://localhost:3001/api/posts/more/${currentUser._id}/${
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

	return postsToDisplay[0] ? (
		<div id={styles.container}>
			<h1 id={styles.feed}>Your Feed:</h1>
			{postsToDisplay.map((post, index) => {
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
													...new Uint8Array(post.user.avatar.data.data)
												)
											)
										}
										onClick={() => navigate("/user")}
									/>
									<button
										className={styles.username}
										onClick={(e) => {
											handleSetProfile(e.target.textContent);
											navigate("/user");
										}}
									>
										{post.user.username}
									</button>
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
			})}
		</div>
	) : (
		<div id={styles.container}>
			<h1 id={styles.feed} className={styles.emptyFeed}>
				Your Feed:
			</h1>
			<span>
				Your feed is empty. Write posts or add friends to liven it up!
			</span>
		</div>
	);
};

export default DisplayPosts;
