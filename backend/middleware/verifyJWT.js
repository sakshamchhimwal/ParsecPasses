import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken';
export const verifyJWT = (req, res, next) => {
    try {
        const token = req.cookies.id_token; // cookie
        // const token = req.headers.Authorization.split(" ")[1];
        if (!token) {
            return res.send({ error: "JWT Token not found" }).status(403);
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (verify) {
            req.body.email = verify.email;
            next();
        }
    } catch (err) {
        return res.send({ error: "Invalid JWT Token" }).status(403);
    }
}