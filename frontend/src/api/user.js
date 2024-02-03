import axios from "axios";
import { BACKEND_URL } from "../constants";

const getToken = () => {
	return localStorage.getItem("id_token");
};

export const getGoogleURL = async () => {
	try {
		const url = `${BACKEND_URL}`;
		const res = await axios.get(url);
		if (res.status !== 200) {
			return null;
		} else {
			return res.data.googleOAuthLink;
		}
	} catch (err) {
		console.log(err);
	}
};

export const getUserPassDetails = async () => {
	try {
		const url = `${BACKEND_URL}user/pass`;
		const res = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const fetchToken = async (code) => {
	try {
		const url = `${BACKEND_URL}auth`;
		const res = await axios.get(url, {
			params: {
				code,
			},
		});
		return res.data;
	} catch (err) {
		const mute = err;
		console.log(mute);
		return { error: true };
	}
};

export const signin = async (data) => {
	try {
		const res = await axios.post(`${BACKEND_URL}signin`, data);
		return res.data;
	} catch (err) {
		const mute = err;
		return { error: "true" };
	}
};
