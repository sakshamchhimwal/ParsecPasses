import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import { mailTemplate } from '../utils/mailTemplateGenrator.js';
config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'support.parsec@iitdh.ac.in',
        pass: process.env.APP_PASS
    }
});



export const sendEmail = (emailAddress, name, imageLink, renderImage, uuid) => {
    const mailOptions = {
        from: 'support.parsec@iitdh.ac.in',
        to: emailAddress,
        subject: 'Parsec Pass',
        html: mailTemplate(emailAddress, name, imageLink, renderImage, uuid)
        // html: mailTemplate(emailAddress, name, imageLink, uuid)
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
