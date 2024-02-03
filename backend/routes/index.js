import { Router } from "express";
import getGoogleOAuthURL from "../utils/getGoogleURL.js";
import createHttpError from "http-errors";
import { config } from "dotenv";
import qs from "qs";
import jwt from "jsonwebtoken";
import axios from "axios";
config();

const router = Router();

router.get("/", function (req, res, next) {
	return res.send({ googleOAuthLink: getGoogleOAuthURL() }).status(200);
});

router.post("/signin", async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (
			email === process.env.PARSEC_USERNAME &&
			password === process.env.PARSEC_PASSWORD
		) {
			const newToken = jwt.sign(
				{
					email: "support.parsec@iitdh.ac.in",
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "1h",
				}
			);
			return res.send({ authCode: newToken }).status(200);
		}
		return next(createHttpError(403));
	} catch (err) {
		console.log(err);
		return next(createHttpError(500));
	}
});

router.get("/auth", async function (req, res, next) {
	if (!req.query.code) {
		return next(createHttpError(404, "Auth code not found"));
	}
	const data = {
		grant_type: "authorization_code",
		code: req.query.code,
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
		redirect_uri: process.env.GOOGLE_REDIRECT_URI,
	};
	const result = await axios.post(
		"https://oauth2.googleapis.com/token",
		qs.stringify(data),
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		}
	);
	const newToken = jwt.sign(
		{
			email: jwt.decode(result.data.id_token).email,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "1h",
		}
	);
	return res.send({ authCode: newToken }).status(200);
});

export default router;
