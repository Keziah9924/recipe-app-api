import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

export const encryptPassword = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.password) return res.status(400).json({ message: 'No password provided' })
    try {
        const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        return next();
    } catch (error: any) {
        return next(error)
    }
}