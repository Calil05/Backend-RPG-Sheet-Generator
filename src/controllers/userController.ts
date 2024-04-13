import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { User }  from "../models/userModel"
import UserRepository from "../repositories/userRepository";
import UserService from "../services/userService";

const userService = new UserService;
const userRepository = new UserRepository;

export const createUser: RequestHandler = async (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const passwd = req.body.passwd;
    const access_level = req.body.access_level;

    try{
        const hashedPassword = await bcrypt.hash(passwd, 8);

        const userJson = {
            "name":name,
            "email":email,
            "passwd":hashedPassword,
            "access_level":access_level
        }

        var users = await User.create({ ...userJson });
        return res
        .status(200)
        .json({ message: "User Created", data: users });
    }catch(error) {
        console.error("Error: ", error)
    }
};

export const deleteUser: RequestHandler = async(req, res, next) => {
    const {id} = req.params;
    const deletedUser: User|null = await User.findByPk(id);

    await User.destroy({where: {id}});
    return res.status(200).json({ message: "User Deleted", data:deletedUser })
}

export const getAllUsers: RequestHandler = async(req, res, next) => {
    const users: User[] = await User.findAll();
    
    return res.status(200).json({data:users})
}

export const getUserById: RequestHandler = async(req, res, next) => {
    const {id} = req.params;
    const user:User|null = await User.findByPk(id)

    return res.status(200).json({data:user})
}

export const updateUser: RequestHandler = async(req, res, next) => {
    const {id} = req.params;

    await User.update({...req.body},{where:{id}});
    const updatedUser: User|null = await User.findByPk(id);
    return res.status(200).json({data:updatedUser})
}

export const login: RequestHandler = async(req, res, next) => {
    try {
        let foundUser = await userService.login(req.body);
        res.status(200).send(foundUser);
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500);
    }
}