import React, { useState, useEffect, useContext } from "react";
import styles from "./Like.module.css";
import { navigate } from "gatsby";
import { getUser } from "../../services/auth";
import { PostContext } from "../../contexts/GlobalContext";

const Like = ({ count, post }) => {
	const [likeCount, setLikeCount] = useState(count);
	const [userLiked, setUserLiked] = useState(false);
	const { postId, setPost } = useContext(PostContext);
	const currentUser = getUser()._id;

	useEffect(() => {
		console.log(currentUser, post._id);
		fetch(
			`http://localhost:3001/api/posts/user-like/${currentUser}/${post._id}`,
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
					console.log(response, "likeCheck");
					setUserLiked(response);
				} else {
					console.log("no posts to display");
				}
			})
			.catch((error) => {
				console.log("catch initial", error);
				navigate("/error");
			});
	}, []);

	const handleLike = (e) => {
		e.preventDefault();
		const likeUnlike = e.target.textContent;
		const data = {
			likeUnlike: likeUnlike,
			likes: null,
			currentUser: getUser()._id,
		};
		if (likeUnlike === "Like") {
			data.likes = likeCount + 1;
		} else {
			data.likes = likeCount - 1;
		}
		fetch(`http://localhost:3001/api/posts/like/${post._id}`, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response && likeUnlike === "Like") {
					console.log(response);
					setLikeCount(response);
					setUserLiked(true);
				} else {
					console.log(response);
					setLikeCount(response);
					setUserLiked(false);
				}
			})
			.catch((error) => {
				console.log("catch initial", error);
				navigate("/error");
			});
	};

	const handleShowHideComments = (e) => {
		if (e.target.textContent === "Show Comments") {
			setPost([...postId, post._id]);
		} else if (e.target.textContent === "Hide Comments") {
			setPost(postId.filter((val, index) => val !== post._id));
		}
	};

	return (
		<>
			<div className={styles.likeContainer}>
				<button
					className={`${styles.btn} ${styles.showComments}`}
					onClick={(e) => handleShowHideComments(e)}
				>
					{postId.includes(post._id) ? "Hide Comments" : "Show Comments"}
				</button>
				<button
					className={styles.btn}
					onClick={() => {
						setPost(post._id);
						navigate("/writeComment");
					}}
				>
					Comment
				</button>
				<button
					className={`${styles.btn} ${styles.likeUnlike}`}
					onClick={(e) => handleLike(e)}
				>
					{userLiked ? "Un-Like" : "Like"}
				</button>
				<span className={userLiked ? styles.userLiked : styles.regular}>
					{likeCount}
				</span>
			</div>
		</>
	);
};

export default Like;
