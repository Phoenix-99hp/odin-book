import { useState, useEffect } from "react";
import { profile } from "../contexts/GlobalContext";

export const useAPI = (url) => {
	const [data, setData] = useState(null);
	const API_URL = "http://localhost:3001/api";
	useEffect(() => {
		const fetchData = async () => {
			fetch(`${API_URL}${url}`)
				.then((response) => response.json())
				.then((result) => {
					console.log("API", result);
					setData(result);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchData();
	}, [profile]);
	return { data };
};
