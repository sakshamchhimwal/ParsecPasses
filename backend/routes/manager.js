import { config } from "dotenv";
import { Router } from "express";
import createHttpError from "http-errors";
// import UserModel from "../models/UserModel.js";

import { UserSchemaValidationChain, userSchemaValidationMiddleware } from '../utils/schemaValidator.js';
import { checkEmailInUse } from "../middleware/checkEmailInUse.js";
import { provideQRCodeLink } from "../middleware/addQRCode.js";
import { provideUUID } from "../middleware/addUUID.js";
import { sendEmail } from "../services/mailService.js"
import DjNiteModel from "../models/DJNiteModel.js";
config();


const router = Router();

router.get('/verify/:id', async (req, res, next) => {
    const uuid = req.params.id;
    const findUser = await DjNiteModel.findOne({ uuid: uuid, used: false });
    if (findUser) {
        return res.send({ findUser }).status(200);
    }
    return findUser?.used ?
        next(createHttpError(403, "User code already used")) :
        next(createHttpError(404, "User does not exist"));
})

router.post('/verify/:id', async (req, res, next) => {
    const uuid = req.params.id;
    const findUser = await DjNiteModel.findOne({ uuid: uuid });
    if (findUser) {
        findUser.used = true;
        await findUser.save();
        return res.send({ message: "QR code has been registered" }).status(200);
    }
    return next(createHttpError(404, "User does not exist"));
})

router.post('/register', checkEmailInUse, UserSchemaValidationChain, userSchemaValidationMiddleware, provideUUID, provideQRCodeLink, async (req, res, next) => {
    try {
        const user = await DjNiteModel.findOne({ email: req.body.email });
        if (!user) {
            const data = req.body;
            const newUser = await DjNiteModel.create({
                uuid: data.uuid,
                email: data.email,
                full_name: data.full_name,
                college_name: data.college_name,
                // year: data.year,
                // branch: data.branch,
                // date_of_birth: data.date_of_birth,
                mobile_number: data.mobile_number,
                qr_code_url: data.qr_code_url
            });
            sendEmail(req.body.email, req.body.full_name, req.body.qr_code_url, req.body.image, req.body.uuid);
            return res.send({ message: "User registered successfully" }).status(200);
        } else {
            return res.send({ message: "User with this email already exists." }).status(409);
        }
    } catch (err) {
        console.log(err);
        return next(createHttpError(503, "Internal Server Error"));
    }
})


export default router;