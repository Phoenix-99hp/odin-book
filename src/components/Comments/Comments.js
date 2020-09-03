import React, { useContext, useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import styles from "./Comments.module.css";
import moment from "moment";
import { ProfileContext, PostContext } from "../../contexts/GlobalContext";
import Spinner from "../Spinner";

const Comments = ({ post }) => {
	const [spinner, setSpinner] = useState(false);
	const { postId, setPost } = useContext(PostContext);
	const { profile, setProfile } = useContext(ProfileContext);

	// const { setPostsToDisplay } = useContext(PostsToDisplayContext);

	// useEffect(() => {
	//     setSpinner(true)
	//     setTimeout(() => {
	//         setSpinner(false)
	//     }, 1000)
	// }, [postId])

	// spinner && postId.includes(post._id) ? (
	//     <div id={styles.spinnerContainer}>
	//         <Spinner />
	//     </div>
	// ) :
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
					const currentProfile = profile;
					console.log("original response:", response);
					setProfile(response);
					console.log("profile after set:", profile);
					navigate("/user");
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
		<div
			className={`${styles.hide} ${
				postId.includes(post._id) ? styles.show : null
			}`}
		>
			{post.comments[0] ? (
				post.comments.map((comment, index) => {
					return (
						<div className={styles.commentContainer} key={index}>
							<div className={`${styles.space} ${styles.text}`}>
								{comment.text}
							</div>
							<div className={styles.commentUser}>
								<img
									className={styles.commentAvatar}
									src={
										"data:image/jpeg;base64," +
										btoa(
											String.fromCharCode(
												...new Uint8Array(comment.user.avatar.data.data)
											)
										)
									}
									onClick={(e) =>
										handleSetProfile(e.target.nextElementSibling.textContent)
									}
								/>
								<button
									className={styles.username}
									onClick={(e) => {
										handleSetProfile(e.target.textContent);
									}}
								>
									{comment.user.username}
								</button>
								<span className={styles.timeSpan}>
									({moment(comment.timestamp).format("L")})
								</span>
							</div>
						</div>
					);
				})
			) : (
				<div className={styles.commentContainer}>
					This post has not received any comments.
				</div>
			)}
		</div>
	);
};

export default Comments;
