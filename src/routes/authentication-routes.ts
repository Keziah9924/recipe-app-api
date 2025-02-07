import { Router } from 'express';
import { loginUser, otp, resetPassword, resetPasswordLink } from '../api/controllers/auth/';
import { encryptPassword } from '../middlewares/password-encrypt';

export = (router: Router) => {
    router.post('/auth/login', loginUser);

    router.post('/auth/verify-account', otp);

    router.post('/auth/reset-link', resetPasswordLink);

    router.post('/auth/reset-password', encryptPassword, resetPassword);
};
