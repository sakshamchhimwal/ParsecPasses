import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
export const verifyJWT = (req, res, next) => {
    try {
        // const token = req.cookies.id_token; // cookie
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1]; // header
        if (!token) {
            return next(createError(403, 'JWT Token Not Found', { expose: false }))
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (verify) {
            req.body.email = verify.email;
            next();
        }
    } catch (err) {
        console.log(err);
        return next(createError(403, 'Invalid JWT Token', { expose: false }))
    }
}