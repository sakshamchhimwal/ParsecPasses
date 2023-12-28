import UserModel from "../models/UserModel.js";

export const checkEmailInUse = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return next();
        }
        return res.redirect('/user/pass');
    } catch (err) {
        console.log(err);
    }
}
