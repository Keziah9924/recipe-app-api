"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const config_1 = require("./config");
const sendMail = (to, template) => {
    const mailOptions = {
        from: `FoodiesHub <${process.env.EMAIL_SENDER_ADDRESS}`,
        to,
        subject: `Account Verification`,
        html: template,
    };
    return config_1.transporter.sendMail(mailOptions);
};
exports.sendMail = sendMail;
//# sourceMappingURL=index.js.map