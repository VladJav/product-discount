import {createTransport} from "nodemailer";
export const sendMail = (to: string, subject: string, html: string) => {
    const transporter = createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
        }
    });

    return transporter.sendMail({
        from: `"Product Discount" <${process.env.NODEMAILER_SENDER_EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });
};