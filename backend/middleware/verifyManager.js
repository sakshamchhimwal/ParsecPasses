import UserModel from "../models/UserModel.js";
import createError from 'http-errors';
import jwt from "jsonwebtoken";

export const verifyManager = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // header
        if (!token) {
            return next(createError(403, 'JWT Token Not Found', { expose: false }))
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (verify) {
            const findManager = await UserModel.findOne({ email: verify.email });
            if (findManager.role === "manager") {
                console.log("Manager Verified");
                return next();
            }
        }
        return next(createError(403, "Not a manager"));
    } catch (err) {
        console.log(err);
        return next(createError(503, "Unverified JWT"));
    }
}