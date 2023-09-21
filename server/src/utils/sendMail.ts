import {nodemailerConfig} from "./index";
import {createTransport} from "nodemailer";
export const sendMail = (to: string, subject: string, html: string) => {
    const transporter = createTransport(nodemailerConfig);

    return transporter.sendMail({
        from: `"Product Discount" <${process.env.NODEMAILER_SENDER_EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });
};