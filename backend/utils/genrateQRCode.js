import qrcode from 'qrcode';
import fs from 'fs';

export const genrateQRCode = async (uuid) => {
    try {
        const genQRCode = await qrcode.toFile(
            `./public/images/qrcodes/${uuid}.png`,
            uuid
        )
    } catch (err) {
        throw err;
    }
}