import { v4 } from 'uuid';

export const provideUUID = (req, res, next) => {
    req.body.uuid = v4().toString();
    // console.log("Provided UUID: ",req.body.uuid);
    return next();
}