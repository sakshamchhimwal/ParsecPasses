import createHttpError from "http-errors";
import UserModel from "../models/UserModel.js";

export const checkEmailInUse = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return next();
        }
        return res.send({ message: "User with this email already exists." }).status(409);
    } catch (err) {
        console.log(err);
        return next(createHttpError(500));
    }
}
