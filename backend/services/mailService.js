import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import { mailTemplate } from '../utils/mailTemplateGenrator';
config();

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
        html: mailTemplate(emailAddress, name, imageLink, uuid)
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
