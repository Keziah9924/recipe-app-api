"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const user_model_1 = __importDefault(require("../api/models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const users = [
    {
        firstname: 'Default',
        lastname: 'User',
        email: 'default-user@example.com',
        username: 'defaultuser',
        password: process.env.ADMIN_USER_PASSWORD
    },
];
const seedUsers = async () => {
    try {
        const existingAdmin = await user_model_1.default.findOne({ email: 'default-user@example.com' });
        if (existingAdmin) {
            console.log('Default user already exists. Skipping seeding.');
            return;
        }
        const seededUsers = await Promise.all(users.map(async (user) => {
            const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
            return {
                ...user,
                password: hashedPassword,
            };
        }));
        await user_model_1.default.insertMany(seededUsers);
        console.log('Default user seeded successfully.');
    }
    catch (error) {
        console.error('Error seeding users:', error);
    }
};
exports.seedUsers = seedUsers;
//# sourceMappingURL=seeder.js.map