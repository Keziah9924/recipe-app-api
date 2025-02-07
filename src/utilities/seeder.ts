import User from '../api/models/user.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const users = [
    {
        firstname: 'Default',
        lastname: 'User',
        email: 'default-user@example.com',
        username: 'defaultuser',
        password: process.env.ADMIN_USER_PASSWORD
    },
];

export const seedUsers = async () => {
    try {
        const existingAdmin = await User.findOne({ email: 'default-user@example.com'});

        if (existingAdmin) {
            console.log('Default user already exists. Skipping seeding.');
            return;
        }

        const seededUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password as string, 10);

                return {
                    ...user,
                    password: hashedPassword,
                };
            })
        );

        await User.insertMany(seededUsers);
        console.log('Default user seeded successfully.');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};