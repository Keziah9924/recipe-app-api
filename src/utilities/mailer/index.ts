import { transporter } from './config'

export const sendMail = (to: string, template: string) => {
    const mailOptions = {
        from: `FoodiesHub <${process.env.EMAIL_SENDER_ADDRESS}`,
        to,
        subject: `Account Verification`,
        html: template,
    };

    return transporter.sendMail(mailOptions);
}