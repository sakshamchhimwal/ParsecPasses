import { config } from 'dotenv';
config();
import { v2 as cloudinary } from 'cloudinary';

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
            use_filename: true,
            folder: "BinaryBeats"
        });
        //! Front
        // const image = cloudinary.image("n4t4s403acgtiym3vo4n.jpg", {
        //     transformation: [
        //         { overlay: res.public_id },
        //         { width: 295, crop: "scale" },
        //         { flags: "layer_apply", x: "0.35", y: "0.18" }
        //     ]
        // });

        //! Middle
        // const image = cloudinary.image("lla6rdju7ow0witwn9wa.jpg", {
        //     transformation: [
        //         { overlay: res.public_id },
        //         { width: 295, crop: "scale" },
        //         { flags: "layer_apply", x: "0.35", y: "0.18" }
        //     ]
        // });

        //! Back
        // const image = cloudinary.image("n6nqpeiutlhvsbtrx9ky.jpg", {
        //     transformation: [
        //         { overlay: res.public_id },
        //         { width: 295, crop: "scale" },
        //         { flags: "layer_apply", x: "0.35", y: "0.18" }
        //     ]
        // });

        //! Dj Nite
        const image = cloudinary.image("BinaryBeats/ebcfryia4bfu5ff1ehk4.jpg", {
            transformation: [
                { overlay: res.public_id.replace('/',':') },
                { height: 400, width: 400, crop: "scale" },
                { effect: "screen", flags: "layer_apply", x: -740, y: 100 }
            ]
        })
        //! FREE
        // const image = ""
        return { url: res.secure_url, image };
    } catch (err) {
        console.log(err);
    }
}
