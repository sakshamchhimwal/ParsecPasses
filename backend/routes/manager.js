import { config } from "dotenv";
config();
import { Router } from "express";
import UserModel from "../models/UserModel";


const router = Router();

router.get('/:id', async (req, res, next) => {
    const uuid = req.params.id;
    const findUser = await UserModel.findOne({ uuid: uuid, used: false }, 'uuid email full_name college_name year branch mobile_number date_of_birth qr_code_url used');
    if (findUser) {
        return res.send({ findUser }).status(200);
    }
    return findUser.used ?
        res.send({ error: "QR code either used" }).status(403) :
        res.send({ error: "User does not exist" }).status(404);
})

router.post('/:id', async (req, res, next) => {
    const uuid = req.params.id;
    const findUser = await UserModel.findOne({ uuid: uuid });
    if (findUser) {
        findUser.used = true;
        await findUser.save();
        return res.send({ message: "QR code has been registered" }).status(200);
    }
    return res.send({ error: "User does not exist" }).status(404);
})


export default router;