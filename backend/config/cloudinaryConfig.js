import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
config();

cloudinary.config({
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME
})

const pingRes = await cloudinary.api.ping();
pingRes.status === 'ok' ? console.log("Connected to Cloudinary") : console.warn("Cloudinary connection failed");

export const uploadToCloudinary = async (uuid) => {
    try {
        const res = await cloudinary.uploader.upload(`./public/images/qrcodes/${uuid}.png`, {
            use_filename: true
        });
        return res.secure_url;
    } catch (err) {
        console.log(err);
    }
}