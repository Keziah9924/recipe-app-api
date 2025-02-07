"use strict";
const auth_1 = require("../api/controllers/auth/");
const password_encrypt_1 = require("../middlewares/password-encrypt");
module.exports = (router) => {
    router.post('/auth/login', auth_1.loginUser);
    router.post('/auth/verify-account', auth_1.otp);
    router.post('/auth/reset-link', auth_1.resetPasswordLink);
    router.post('/auth/reset-password', password_encrypt_1.encryptPassword, auth_1.resetPassword);
};
//# sourceMappingURL=authentication-routes.js.map