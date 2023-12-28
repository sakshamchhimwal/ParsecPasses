import { uploadToCloudinary } from "../config/cloudinaryConfig.js";
import { genrateQRCode } from "../utils/genrateQRCode.js";

export const provideQRCodeLink = async (req, res, next) => {
    try {
        await genrateQRCode(req.body.uuid);
        const url = await uploadToCloudinary(req.body.uuid);
        req.body.qr_code_url = url;
        return next();
    } catch (err) {
        throw err;
    }
}