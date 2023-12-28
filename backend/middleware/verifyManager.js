import UserModel from "../models/UserModel";

export const verifyManager = async (req, res, next) => {
    const findManager = await UserModel.findOne({ email: req.body.email });
    if (findManager.role === "manager") {
        return next();
    }
    return res.send({ error: "Not a manager" }).status(403);
}