import { config } from 'dotenv';
config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saksham19684718@gmail.com',
        pass: process.env.APP_PASS
    }
});



export const sendEmail = (emailAddress, name, imageLink, uuid) => {
    const mailOptions = {
        from: 'saksham19684718@gmail.com',
        to: emailAddress,
        subject: 'Parsec Passes',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
            <title>Your Pass is Here!</title>
            <style>
            body {
                font-family: sans-serif;
            }
            h1 {
                font-size: 24px;
                margin-bottom: 20px;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
            }
            .pass-info {
                border: 1px solid #ccc;
                padding: 20px;
                margin-bottom: 20px;
            }
            img {
                width: 200px;
                height: 200px;
                object-fit: cover; /* Ensures QR code fits within image dimensions */
            }
            </style>
            </head>
            <body>
            <h1>Your Pass is Ready!</h1>
            <p>Hi ${name},</p>
            <p>Your pass is now available. Please access it using the following information:</p>
            <div class="pass-info">
                <h2>Pass ID:</h2>
                <p>${uuid}</p>
                <h2>QR Code:</h2>
                <p><a href="${imageLink}">View QR Code</a></p>
                <img src="${imageLink}" alt="Pass QR Code">
            </div>
            <p>Please keep this information safe and present your QR code when needed.</p>
            <p>Thank you!</p>
            <p>Sincerely,<br>Parsec</p>
            </body>
            </html>
        `
    };
    console.log(mailOptions.text);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
