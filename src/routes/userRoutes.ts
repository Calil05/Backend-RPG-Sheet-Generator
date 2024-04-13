import { Router } from "express";

import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
} from "../controllers/userController"

const router = Router();

router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUser);

export default router;