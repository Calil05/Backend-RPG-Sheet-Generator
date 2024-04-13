import { response } from "express";
import { User }  from "../models/userModel"
import UserRepository from "../repositories/userRepository";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository;

class UserService {
    async login(user:User) {
        try {
            const foundUser = await userRepository.findUserByEmail(user.email)
    
            if (!foundUser) {
                throw new Error('Incorrect email or password');
            }
    
            const match = await bcrypt.compare(user.passwd, foundUser.passwd)

            if (match) {
                const token = jwt.sign({ id: foundUser.id?.toString(), email: foundUser.email, access_level: foundUser.access_level }, 'SECRET_KEY', {
                    expiresIn: '2 days'
                });
                return { foundUser, token: token}
            } else {
                console.error('Password is not correct')
                return response.status(500);
            }
    
        } catch (error) {
            throw error;
        }
        
    }
}

export default UserService;