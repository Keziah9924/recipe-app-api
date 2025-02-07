"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templates = void 0;
const account_verification_template_1 = require("./account-verification-template");
const reset_password_template_1 = require("./reset-password-template");
const templates = (props, type) => {
    let template = ``;
    switch (type) {
        case 'verify-account':
            template = (0, account_verification_template_1.verifyAccountTemplate)({ ...props });
            break;
        case 'reset-password': template = (0, reset_password_template_1.resetPasswordTemplate)({ ...props });
    }
    return template;
};
exports.templates = templates;
//# sourceMappingURL=index.js.map