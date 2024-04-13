import { RequestHandler } from "express";

import { User }  from "../models/userModel"

export const createUser: RequestHandler = async (req, res, next) => {
    var users = await User.create({ ...req.body });
    return res
        .status(200)
        .json({ message: "User Created", data: users });
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