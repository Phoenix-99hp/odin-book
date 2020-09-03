import React from "react";
import styles from "./PostForm.module.css";
import { navigate } from "gatsby";
import { getUser } from "../../services/auth";

const PostForm = () => {
	const handlePostSubmit = (e) => {
		e.preventDefault();
		const postData = {
			title: e.target.previousElementSibling.children[0].children[1].value,
			text: e.target.previousElementSibling.children[1].children[1].value,
			user: getUser()._id,
			// avatar: getUser.avatar.data,
		};
		fetch("http://localhost:3001/api/new-post", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		})
			.then((res) => {
				return res.json();
			})
			.then((response) => {
				if (response) {
					console.log(response);
					navigate("/dashboard");
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

	return (
		<form id={styles.postForm}>
			<button id={styles.closeModalBtn} onClick={() => navigate("/dashboard")}>
				x
			</button>
			<h3 id={styles.heading}>Write Post</h3>
			<div id={styles.fieldContainer}>
				<div className={styles.formGroup}>
					<label>Title:</label>
					<input id={styles.postInput} type="text" />
				</div>
				<div className={styles.formGroup}>
					<label id={styles.pBodyLabel}>Post:</label>
					<textarea id={styles.postInput} type="text" />
				</div>
			</div>
			<button className={styles.btn} onClick={(e) => handlePostSubmit(e)}>
				Create Post
			</button>
		</form>
	);
};

export default PostForm;
