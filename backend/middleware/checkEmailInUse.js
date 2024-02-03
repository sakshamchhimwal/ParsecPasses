import createHttpError from "http-errors";
// import UserModel from "../models/UserModel.js";
import UserModel from "../models/DJNiteModel.js";

export const checkEmailInUse = async (req, res, next) => {
	try {
		// console.log(req.body);
		const user = await UserModel.findOne({ email: req.body.email });
		if (!user) {
			return next();
		}
		return next(createHttpError(409, "User with email already exists"));
	} catch (err) {
		console.log(err);
		return next(createHttpError(500));
	}
};
